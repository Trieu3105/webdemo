const express = require("express");
const router = express.Router();
const db = require("../data/database");
const bodyParser = require("body-parser");
const app = express();

// Middleware để parse dữ liệu JSON từ body
app.use(bodyParser.json());

router.get("/banking", async (req, res) => {
  try {
    const query = "SELECT * FROM atm_bank";
    const bank = await new Promise((resolve, reject) => {
      db.query(query, (err, results) => {
        if (err) {
          reject("Error fetching bank data:", err);
        }
        resolve(results);
      });
    });
    if (!bank || bank.length === 0) {
      return res.status(404).json({ error: "No clan data found" });
    }

    // Trả về dữ liệu
    return res.json(bank);
  } catch (error) {
    console.error("Error processing clan data:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});
router.post("/banking", (req, res) => {
  const { amount, paymentOption, ratio } = req.body;

  // Kiểm tra dữ liệu
  if (!amount || !paymentOption || !ratio) {
    return 
  }

  // Xử lý nạp tiền
  const result = handleOpenModalAndSubmit(amount, paymentOption, ratio);

  // Trả kết quả về front-end
  return res.status(200).json({
    success: true,
    message: "Nạp tiền thành công",
    data: result,
  });
});
// Hàm xử lý nạp tiền
const handleOpenModalAndSubmit = (amount, paymentOption, ratio) => {
  return { amount, paymentOption, ratio };
};

module.exports = router;
