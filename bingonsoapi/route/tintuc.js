const express = require("express");
const router = express.Router();
const db = require("../data/database"); // Giả sử bạn đã cấu hình kết nối DB trong file này

// API Route để lấy danh sách bài viết
router.get("/tintuc", async (req, res) => {
  try {
    const query =
      "SELECT id, slug, title, sub_title, content, img_url, views FROM posts";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Lỗi truy vấn dữ liệu:", err);
        return res.status(500).json({ error: "Không thể lấy dữ liệu" });
      }

      const posts = results.map((post) => ({
        id: post.id,
        slug: post.slug,
        title: post.title,
        sub_title: post.sub_title,
        content: post.content, // Trả về dữ liệu content chứa HTML
        img_url: post.img_url,
        views: post.views,
      }));

      res.status(200).json(posts);
    });
  } catch (error) {
    console.error("Lỗi khi xử lý yêu cầu:", error);
    res.status(500).json({ error: "Đã xảy ra lỗi" });
  }
});

// API Route để lấy chi tiết bài viết
router.get("/tintuc/tinhot/:id", async (req, res) => {
    const { id } = req.params; // Lấy id từ URL
    console.log("nhận id từ URL :" ,id);
  
    try {
      const query = "SELECT id, slug, title, sub_title, content, img_url, views FROM posts WHERE id = ?";
      db.query(query, [id], (err, results) => {
        if (err) {
          console.error("Lỗi truy vấn dữ liệu:", err);
          return res.status(500).json({ error: "Không thể lấy dữ liệu bài viết" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ error: "Bài viết không tồn tại" });
        }
  
        const post = results[0]; // Lấy bài viết đầu tiên từ kết quả
        res.status(200).json(post);
      });
    } catch (error) {
      console.error("Lỗi khi xử lý yêu cầu:", error);
      res.status(500).json({ error: "Đã xảy ra lỗi" });
    }
  });
  
  
  
  
module.exports = router;
