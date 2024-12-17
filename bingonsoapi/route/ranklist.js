const express = require('express');
const router = express.Router();
const db = require('../data/database');// Đảm bảo module db đã được cấu hình để kết nối MySQL

// Hàm định dạng ngày tháng
function formatDate(date) {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

// Hàm chuyển đổi timestamp sang giờ Hà Nội
function convertTimestampToHanoiTime(timestamp) {
    if (!timestamp) return null;
    const date = new Date(timestamp); // Chuyển đổi timestamp thành đối tượng Date
    const offset = 7 * 60 * 60 * 1000; // Lấy độ lệch múi giờ (GMT+7)
    const hanoiDate = new Date(date.getTime() + offset); // Thêm độ lệch múi giờ vào
    return formatDate(hanoiDate); // Định dạng lại ngày theo kiểu bạn mong muốn
}

// Hàm tính số ngày giữa 2 ngày
function calculateDaysBetweenDates(startDate, endDate) {
    const timeDiff = endDate - startDate; // Lấy chênh lệch thời gian (tính bằng milliseconds)
    const daysDiff = timeDiff / (1000 * 3600 * 24); // Chuyển đổi thành số ngày
    return Math.floor(daysDiff); // Làm tròn xuống số nguyên
}

// Route /players
router.get('/players', async (req, res) => {
    try {
        // Truy vấn tất cả dữ liệu từ bảng players
        const query = 'SELECT * FROM players';
        const players = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject('Error fetching players data:', err);
                }
                resolve(results);
            });
        });

        if (!players || players.length === 0) {
            return res.status(404).json({ error: 'No players data found' });
        }

        // Lấy dữ liệu từ bảng "others" (để lấy giá trị "value")
        const othersQuery = 'SELECT value FROM others WHERE id = 1';
        const othersResult = await new Promise((resolve, reject) => {
            db.query(othersQuery, (err, results) => {
                if (err) {
                    reject('Error fetching others data:', err);
                }
                resolve(results[0]);
            });
        });

        if (!othersResult) {
            return res.status(404).json({ error: 'No others data found' });
        }

        // Giải mã JSON trong trường value của bảng "others"
        let mappedValues = [];
        try {
            const values = JSON.parse(othersResult.value);
            // Ánh xạ giá trị từ 1 đến 131
            for (let i = 0; i < 131; i++) {
                const level = i + 1; // Number bắt đầu từ 1
                const value = values[i] || null; // Lấy giá trị value tương ứng
                mappedValues.push({ level, value });
            }
        } catch (error) {
            console.error('Error parsing JSON value in others:', error);
            return res.status(500).json({ error: 'Invalid JSON format in value' });
        }

        // Xử lý từng hàng dữ liệu từ bảng players và lấy tongnap từ bảng users
        const result = await Promise.all(players.map(async (row) => {
            let data = {};
            try {
                if (row.data) data = JSON.parse(row.data); // Giải mã trường "data"
            } catch (error) {
                console.error('Error parsing JSON data:', error);
            }

            // So sánh giá trị exp với mappedValues
            const exp = data.exp || 0; // Lấy giá trị exp từ dữ liệu
            let playerLevel = null;

            // Tìm level tương ứng với exp
            for (let i = 0; i < mappedValues.length; i++) {
                if (exp >= mappedValues[i].value) {
                    playerLevel = mappedValues[i].level; // Lấy level tương ứng với exp
                }
            }

            // Lấy giá trị LevelUpTime và tính số ngày từ thời điểm đó
            const levelUpTime = data.levelUpTime;
            let hanoiTime = null;
            let daysBetween = null;

            // Kiểm tra trường hợp levelUpTime = -1
            if (levelUpTime === -1) {
                hanoiTime = 0;
                daysBetween = 0;
            } else if (levelUpTime) {
                hanoiTime = convertTimestampToHanoiTime(levelUpTime); // Chuyển đổi timestamp thành thời gian Hà Nội
                const [dateStr, timeStr] = hanoiTime.split(' ');
                const [day, month, year] = dateStr.split('/');
                const [hours, minutes, seconds] = timeStr.split(':');

                // Tạo chuỗi ngày tháng theo định dạng ISO mà JavaScript có thể hiểu
                const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

                // Chuyển đổi chuỗi ngày tháng thành đối tượng Date
                const hanoiDate = new Date(formattedDate);

                if (!isNaN(hanoiDate.getTime())) {
                    const currentDate = new Date(); // Ngày hiện tại
                    daysBetween = calculateDaysBetweenDates(hanoiDate, currentDate); // Tính số ngày
                }
            }

            // Truy vấn lấy giá trị tongnap từ bảng users
            const userQuery = 'SELECT tongnap FROM users WHERE id = ?';
            const userResult = await new Promise((resolve, reject) => {
                db.query(userQuery, [row.user_id], (err, results) => {
                    if (err) {
                        reject('Error fetching user data:', err);
                    }
                    resolve(results[0]);
                });
            });

            const tongnap = userResult ? userResult.tongnap : 0; // Nếu không có dữ liệu tongnap, gán giá trị 0

            // Trả về dữ liệu của người chơi và các thông tin liên quan, bao gồm tongnap từ bảng users
            return {
                id: row.id,
                user_id: row.user_id,
                server_id: row.server_id,
                name: row.name,
                gender: row.gender,
                clan: row.clan,
                class: row.class,
                point: row.point,
                potential: row.potential,
                spoint: row.spoint,
                xu: row.xu,
                xuInBox: row.xuInBox,
                yen: row.yen,
                numberCellBag: row.numberCellBag,
                numberCellBox: row.numberCellBox,
                online: row.online,
                activated: row.activated,
                created_at: row.created_at,
                updated_at: row.updated_at,
                tongnap, // Lấy giá trị tongnap từ bảng users
                napdau: row.napdau,
                rewardMOC: row.rewardMOC,
                rewardtop: row.rewardtop,
                countvxmm: row.countvxmm,
                // Dữ liệu đã giải mã từ JSON
                data,
                playerLevel, // Mức level tương ứng với exp
                levelUpTime, // Lấy giá trị LevelUpTime từ dữ liệu
                hanoiTime, // Thời gian LevelUpTime ở giờ Hà Nội
                daysBetween // Số ngày đã qua từ LevelUpTime
            };
        }));

        // Trả về dữ liệu đã xử lý
        return res.json(result);

    } catch (error) {
        console.error('Error processing players data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Route /others
router.get('/others', async (req, res) => {
    try {
        // Truy vấn dữ liệu từ bảng others với id = 1
        const query = 'SELECT value FROM others WHERE id = 1';
        const result = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results[0]);
            });
        });

        // Kiểm tra nếu không có dữ liệu
        if (!result) {
            return res.status(404).json({ error: 'No data found for id = 1' });
        }

        // Giải mã JSON trong trường value
        let values = [];
        try {
            values = JSON.parse(result.value);
        } catch (error) {
            console.error('Error parsing JSON value:', error);
            return res.status(500).json({ error: 'Invalid JSON format in value' });
        }

        // Ánh xạ giá trị từ 1 đến 131
        const mappedValues = [];
        for (let i = 0; i < 131; i++) {
            const level = i + 1; // number bắt đầu từ 1
            const value = values[i] || null; // Lấy giá trị value tương ứng
            mappedValues.push({ level, value });
        }

        // Trả về kết quả mappedValues
        res.status(200).json(mappedValues);
    } catch (error) {
        console.error('Error processing /others:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route /rankgiatoc
router.get('/rankgiatoc', async (req, res) => {
    try {
        // Truy vấn dữ liệu từ bảng clan
        const query = 'SELECT id, server_id, name, main_name, assist_name, alert, coin, level, exp FROM clan';
        const clans = await new Promise((resolve, reject) => {
            db.query(query, (err, results) => {
                if (err) {
                    reject('Error fetching clan data:', err);
                }
                resolve(results);
            });
        });

        // Nếu không có dữ liệu
        if (!clans || clans.length === 0) {
            return res.status(404).json({ error: 'No clan data found' });
        }

        // Trả về dữ liệu
        return res.json(clans);
    } catch (error) {
        console.error('Error processing clan data:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
