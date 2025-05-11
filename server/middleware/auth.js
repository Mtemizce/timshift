export default function authMiddleware(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res.status(401).json({ error: 'Yetkisiz erişim' });
    }
  
    try {
      const decoded = JSON.parse(authHeader);
      if (decoded.id && decoded.username) {
        req.admin = decoded; // Sonraki işlemlerde kullanmak için ekledik
        next();
      } else {
        return res.status(401).json({ error: 'Geçersiz kullanıcı' });
      }
    } catch (err) {
        console.error('❌ Hata:', err.message);
      return res.status(400).json({ error: 'Geçersiz auth verisi' });
    }
  }
  