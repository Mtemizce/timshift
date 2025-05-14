import express from "express";
import db from "../db.js";
import authMiddleware from "../middleware/auth.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.resolve("public/personnel_photo");
    fs.mkdirSync(uploadPath, { recursive: true });
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const tc = req.body.tc_no;
    cb(null, `${tc}${ext}`);
  },
});

const upload = multer({ storage });

// Tüm personeller
router.get("/", authMiddleware, async (req, res) => {
  try {
    const [rows] = await db.execute("SELECT * FROM personnel ORDER BY id DESC");
    res.json(rows);
  } catch (err) {
    console.error("❌ Hata:", err);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

// Yeni personel
router.post("/", authMiddleware, upload.single("image_file"), async (req, res) => {
  // Tüm verileri bu şekilde tanımla:
  const toNull = (v) => (v === undefined || v === "" ? null : v);

  const { name, tc_no, birth_date, address, phone, email, marital_status, criminal_record, children_count, driving_license, education_level, iban, department, certificates, size_pants, size_tshirt, size_coat, size_shoes, start_date, role } = req.body;

  const image_file = req.file ? req.file.filename : null;

  try {
    const [result] = await db.execute(
      `INSERT INTO personnel 
    (name, tc_no, birth_date, address, phone, email, marital_status, criminal_record,
     children_count, driving_license, education_level, iban, department, certificates,
     size_pants, size_tshirt, size_coat, size_shoes, start_date, role, image_file)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        toNull(name),
        toNull(tc_no),
        toNull(birth_date),
        toNull(address),
        toNull(phone),
        toNull(email),
        toNull(marital_status),
        toNull(criminal_record),
        toNull(children_count),
        toNull(driving_license),
        toNull(education_level),
        toNull(iban),
        toNull(department),
        toNull(certificates),
        toNull(size_pants),
        toNull(size_tshirt),
        toNull(size_coat),
        toNull(size_shoes),
        toNull(start_date),
        toNull(role),
        toNull(image_file),
      ]
    );
    const personnelId = result.insertId;
    await db.execute(
      `INSERT INTO personnel_movements (personnel_id, type, date, reason)
       VALUES (?, 'giriş', CURDATE(), ?)`,
      [personnelId, "Sistem üzerinden ilk kayıt"]
    );

    res.status(201).json({ message: "Personel eklendi" });
  } catch (err) {
    console.error("❌ Hata:", err);
    res.status(500).json({ error: err.message || "Ekleme başarısız" });
  }
});

// Tekil personel verisi
router.get("/:id", authMiddleware, async (req, res) => {
  const { id } = req.params;
  try {
    const [rows] = await db.execute("SELECT * FROM personnel WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Personel bulunamadı" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error("❌ Tekil veri hatası:", err);
    res.status(500).json({ error: "Veri alınamadı" });
  }
});

// Personel güncelleme
router.put("/:id", authMiddleware, upload.single("image_file"), async (req, res) => {
  const { id } = req.params;
  const toNull = (v) => (v === undefined || v === "" ? null : v);

  const {
    name, tc_no, birth_date, address, phone, email, marital_status, criminal_record,
    children_count, driving_license, education_level, iban, department, certificates,
    size_pants, size_tshirt, size_coat, size_shoes, start_date, role
  } = req.body;

  const image_file = req.file ? req.file.filename : req.body.existing_image;

  try {
    await db.execute(
      `UPDATE personnel SET
        name = ?, tc_no = ?, birth_date = ?, address = ?, phone = ?, email = ?, marital_status = ?,
        criminal_record = ?, children_count = ?, driving_license = ?, education_level = ?, iban = ?,
        department = ?, certificates = ?, size_pants = ?, size_tshirt = ?, size_coat = ?, size_shoes = ?,
        start_date = ?, role = ?, image_file = ?
      WHERE id = ?`,
      [
        toNull(name), toNull(tc_no), toNull(birth_date), toNull(address), toNull(phone), toNull(email),
        toNull(marital_status), toNull(criminal_record), toNull(children_count), toNull(driving_license),
        toNull(education_level), toNull(iban), toNull(department), toNull(certificates),
        toNull(size_pants), toNull(size_tshirt), toNull(size_coat), toNull(size_shoes),
        toNull(start_date), toNull(role), toNull(image_file), id
      ]
    );

    res.json({ message: "Personel güncellendi" });
  } catch (err) {
    console.error("❌ Güncelleme hatası:", err);
    res.status(500).json({ error: err.message || "Güncelleme başarısız" });
  }
});



// İşten çıkarma
router.patch('/:id/quit', authMiddleware, async (req, res) => {
  const { id } = req.params;
  const { end_date } = req.body;

  try {
    await db.execute(
      'UPDATE personnel SET is_quitting = 1, end_date = ? WHERE id = ?',
      [end_date || new Date(), id]
    );

    await db.execute(
      `INSERT INTO personnel_movements (personnel_id, type, date, reason)
       VALUES (?, 'çıkış', ?, ?)`,
      [id, end_date || new Date(), 'Sistem üzerinden işten çıkış']
    );

    res.json({ message: 'Personel işten çıkarıldı' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'İşten çıkarma başarısız' });
  }
});


export default router;
