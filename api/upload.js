const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const uploadDir = path.join(__dirname, "uploads");

// Bikin folder upload kalau belum ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Konfigurasi multer buat handle upload file
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = Date.now() + ext;
    cb(null, filename);
  }
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });

  res.json({
    success: true,
    url: `/uploads/${req.file.filename}`
  });
});

// Biar file bisa diakses
app.use("/uploads", express.static(uploadDir));

app.listen(3000, () => console.log("Server jalan di http://localhost:3000"));
