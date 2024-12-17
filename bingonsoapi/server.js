// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const auth = require('./route/auth');
const gift = require('./route/gift'); // Đảm bảo đúng đường dẫn
const tintuc = require('./route/tintuc');
const ranklist = require('./route/ranklist');
const banking = require('./route/bank');

const app = express();
const PORT = process.env.PORT || 8080;

const corsOptions = {
  origin: 'http://localhost:3000', // Đảm bảo đúng URL của frontend
  credentials: true, // Cho phép gửi cookie
};

app.use(cors(corsOptions)); // Cấu hình CORS
app.use(bodyParser.json()); // Để nhận dữ liệu JSON

// Đảm bảo rằng đường dẫn chính xác
app.use('/api', auth);
app.use('/api', gift); 
app.use('/api', tintuc)
app.use('/api', ranklist)
app.use('/api', banking)

// Đảm bảo rằng route gift đã được kết nối

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
