const express = require("express");
const db = require("../data/database");
const router = express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const JWT_SECRET = "your_secret_key";
// import CryptoJS from "crypto-js";

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log(username);
  console.log(password);

  const sql = "SELECT * FROM users WHERE username = ?";
  db.query(sql, [username], (err, results) => {
    if (err) {
      console.error("Error fetching user:", err);
      return res.status(500).json({ error: "Error fetching user" });
    }
    if (results.length === 0) {
      return res.status(401).json({ message: "Sai Pass Rồi Djt me may 1" });
      //
    }
    const user = results[0];

    if (user.password === password) {
      const token = jwt.sign({ username: user.username }, JWT_SECRET, {
        expiresIn: "1h",
      });
      // console.log(token);
      res.cookie("access_token", token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
      return res.status(200).json({ message: "Login successful", token });
    } else {
      return  res.status(401).json({ message: "Sai Pass Rồi Djt me may" });
      //
    }
  });
});
// API đăng ký
router.post("/register", async (req, res) => {
  const { username, password, confirmPassword } = req.body;

  // Kiểm tra các trường nhập liệu
  if (!username || !password || !confirmPassword) {
    return res.status(400).json({ message: "Vui lòng nhập đầy đủ thông tin." });
  }

  // Kiểm tra xác nhận mật khẩu
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Mật khẩu xác nhận không khớp." });
  }

  try {
    // Kiểm tra xem Username đã tồn tại chưa
    const checkUserSql = "SELECT * FROM users WHERE username = ?";
    db.query(checkUserSql, [username], async (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err);
        return res
          .status(500)
          .json({ message: "Lỗi khi kiểm tra người dùng." });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Người dùng đã tồn tại." });
      }
      // Chèn người dùng mới vào cơ sở dữ liệu
      const insertUserSql =
        "INSERT INTO users (username, Password) VALUES (?, ?)";
      db.query(insertUserSql, [username, password], (err, result) => {
        if (err) {
          console.error("Error inserting new user:", err);
          return res
            .status(500)
            .json({ message: "Lỗi khi thêm người dùng mới." });
        }

        res.status(200).json({ message: "Đăng ký thành công!" });
      });
    });
  } catch (error) {
    console.error("Unexpected error during registration:", error);
    res.status(500).json({ message: "Có lỗi xảy ra trong quá trình đăng ký." });
  }
});

router.get("/profile", (req, res) => {
  // Lấy token từ cookie hoặc header
  const token =
    req.cookies?.access_token || req.headers["authorization"]?.split(" ")[1];

  if (!token) {
     return //res
    //   .status(401).json({ message: "Token không hợp lệ hoặc không tồn tại" });
  }
  try {
    // Giải mã token để lấy thông tin người dùng
    const decoded = jwt.verify(token, JWT_SECRET);
    const username = decoded.username;
    // Truy vấn thông tin người dùng từ cơ sở dữ liệu
    const sql = "SELECT * FROM users WHERE username = ?";
    db.query(sql, [username], (err, results) => {
      if (err) {
        console.error("Lỗi khi truy vấn người dùng:", err);
        return res.status(500).json({ error: "Lỗi truy vấn cơ sở dữ liệu" });
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "Không tìm thấy người dùng" });
      }
      const user = results[0];
      // // Ẩn các trường nhạy cảm như mật khẩu
      // delete user.Password;
      return res
        .status(200)
        .json({ message: "Lấy thông tin thành công", profile: user });
    });
  } catch (err) {
    // console.error("Token không hợp lệ:", err);
    return 
      // res
      // .status(401)
      // .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
  }
});

//giải mã JSON
function encryptResponse(data, key) {
    const encryptedData = encryptData(data, key);
    const responseHash = CryptoJS.SHA256(encryptedData).toString();
    return { ct: encryptedData, iv: key, s: responseHash };
}

async function getItemById(itemId) {
    if (!itemId) {
        throw new Error('Invalid item ID');
    }
    try {
        const [rows] = await pool.query('SELECT * FROM item WHERE id = ?', [itemId]);
        return rows[0] || null;
    } catch (error) {
        throw new Error('Error fetching item: ' + error.message);
    }
}

function mergeItems(items) {
    if (!Array.isArray(items) || items.length === 0) {
        return [];
    }

    const mergedItemsMap = new Map();
    items.forEach(item => {
        if (!item || !item.id) {
            return;
        }

        if (mergedItemsMap.has(item.id)) {
            const existingItem = mergedItemsMap.get(item.id);
            existingItem.quantity += item.quantity || 1;
        } else {
            mergedItemsMap.set(item.id, { ...item, quantity: item.quantity || 1 });
        }
    });

    return Array.from(mergedItemsMap.values());
}

exports.giftcode = async (req, res) => {
    const responseKey = generateRandomIV();
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'The GET method is not supported for this route. Supported methods: POST.' });
    }
    let connection;
    try {
        connection = await pool.getConnection();
        const [results] = await connection.query('SELECT * FROM gift_codes');
        if (!results || results.length === 0) {
            const emptyResponse = encryptResponse([], responseKey);
            return res.status(200).json(emptyResponse);
        }

        const giftCodes = results.map(row => ({
            id: row.id,
            server_id: row.server_id,
            type: row.type,
            code: row.code,
            coin: row.coin,
            yen: row.yen,
            gold: row.gold,
            created_at: row.created_at,
            expired_at: row.expired_at,
            updated_at: row.updated_at,
            items: mergeItems(JSON.parse(row.items) || []),
            server: row.server,
            status: row.status
        }));
        
        await Promise.all(giftCodes.map(async code => {
            for (const item of code.items) {
                if (!item || !item.id) {
                    continue;
                }
                try {
                    const itemInfo = await getItemById(item.id);
                    if (itemInfo) {
                        item.name = itemInfo.name;
                        item.icon = itemInfo.icon;
                    }
                } catch (err) {
                }
            }
        }));
        
        const successResponse = encryptResponse(giftCodes, responseKey);
res.status(200).json(successResponse);
    } catch (error) {
        const errorResponse = encryptResponse({ message: 'Lỗi máy chủ nội bộ.' }, responseKey);
        res.status(500).json(errorResponse);
    }
    finally {
        if (connection) connection.release();
    }
};

module.exports = router;
