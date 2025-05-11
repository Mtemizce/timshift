// server/auth.js
import express from 'express';
import db from '../db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM admins WHERE username = ? LIMIT 1',
      [username]
    );

    if (rows.length === 0) {
      return res.status(401).json({ error: 'Kullanıcı bulunamadı' });
    }

    const admin = rows[0];
    const match = await bcrypt.compare(password, admin.password);

    if (!match) {
      return res.status(401).json({ error: 'Şifre yanlış' });
    }

    // Şu anda token yok, sadece kullanıcıyı döndür
    res.json({
      id: admin.id,
      name: admin.name,
      username: admin.username,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Sunucu hatası' });
  }
});

export default router;
