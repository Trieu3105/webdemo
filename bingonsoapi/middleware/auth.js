const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

const auth = (req, res, next) => {
    // Lấy token từ cookie hoặc từ header Authorization
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userName = decoded.userName; // Gán giá trị `userName` từ token vào req
        next(); // Chuyển tiếp đến route handler tiếp theo
    } catch (error) {
        console.error('Token verification failed:', error);
        res.status(403).json({ message: 'Invalid token, authorization denied' });
    }
};
const authenticateToken = (req, res, next) => {
    // Lấy token từ cookie hoặc từ header Authorization
    const token = req.cookies.access_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided, authorization denied' });
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Token verification failed:', err);
            return res.status(403).json({ message: 'Invalid token, authorization denied' });
        }
        req.user = user; // Gán thông tin user cho request
        next(); // Tiếp tục với middleware tiếp theo
    });
};

// // Sử dụng middleware trong route yêu cầu bảo mật
// router.get('/protected', authenticateToken, (req, res) => {
//     res.status(200).json({ message: "This is a protected route", user: req.user });
// });

module.exports = auth;
