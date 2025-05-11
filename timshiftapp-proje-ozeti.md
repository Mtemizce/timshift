# 📦 timShiftApp – Temizlik İşleri Müdürlüğü Vardiya Takip Sistemi

Yerel olarak çalışan bir React + Node.js + MySQL tabanlı personel takip sistemidir.  
Amaç, personellerin nöbet, mesai ve izin durumlarını planlamak, takip etmek ve puantaj oluşturabilmektir.

---

## ✅ Mevcut Özellikler

### 🔐 Kimlik Doğrulama
- `make:admin` CLI aracıyla admin kullanıcı oluşturma
- `bcrypt` ile şifre hash’leme
- JWT benzeri `localStorage` tabanlı oturum
- Giriş yapılmadan sistem erişilemez (authMiddleware)

### 🧑‍💼 Personel Yönetimi
- Personel ekleme/güncelleme
- Aktif/pasif durumu (`is_quitting`, `start_date`, `end_date`)
- Detaylı personel bilgileri (adres, telefon, medeni hal, ehliyet, öğrenim, banka, beden ölçüleri vs.)
- Görsel URL tanımı
- Kayıt ve çıkışta `personnel_movements` tablosuna log kaydı

### 📁 İzin Tanımları
- `leave_types`: İzin türleri yönetimi (Yıllık, Mazeret, vb.)
- `leave_rights`: Personel bazlı yıllık izin tanımlama (gün/yıl/tür)
- Tüm izin işlemleri `dark mode` ve `light mode` uyumlu

### 🧾 Menü & Layout
- Sidebar + Topbar UI (dark/light uyumlu)
- Sidebar açık menü durumu route’a göre yönetiliyor
- Lucide ikonları ile ikonlu navigasyon
- Animasyonlu dark mode geçişi

---

## 🛠️ Teknik Yapı

- React 19 + Vite
- TailwindCSS v4 (`@custom-variant dark`)
- Node.js + Express
- MySQL (CLI + script ile migrate desteği)
- Lucide React Icons
- Auth middleware korumalı API’ler

---

## 📂 Dosya Yapısı (Basitleştirilmiş)

```
timShiftApp/
├── src/
│   ├── pages/
│   │   └── Personnel/
│   │       ├── Personnel.jsx
│   │       ├── LeaveTypes.jsx
│   │       ├── LeaveRights.jsx
│   ├── components/
│   │   └── PersonnelForm.jsx
│   └── App.jsx
├── server/
│   ├── routes/
│   │   ├── personnel.js
│   │   ├── leaveTypes.js
│   │   └── leaveRights.js
│   ├── db.js
│   ├── index.js
│   └── middleware/
│       └── auth.js
├── cli/
│   ├── migrate.js
│   └── make-admin.js
├── sql/
│   └── all_tables.sql
├── public/
├── input.css
└── package.json
```

---

## 📌 Yapılacaklar

- [ ] `leave_records` ekranı: Personelin hangi gün ne izni kullandığı
- [ ] `mesai` ve `haftalık çalışma günü` mantığının tanımı
- [ ] `puantaj` çıktısı (.xlsx/.pdf)
- [ ] `sidebar`'ın ayrı dosyaya taşınması
- [ ] `yetki seviyeleri` (ileride)

---

## 🧪 Bilinen Sorunlar

- `/api/leave-types` ve `/api/personnel-leave-rights` route'ları 404 veriyor
  - Büyük ihtimalle `server/index.js` içinde `app.use(...)` ile tanımlanmamış
  - Ya da route dosyası eksik / adlandırma hatalı
- Sunucu yeniden başlatıldığında bu rotalar kontrol edilmeli

---

## ⌨️ Kullanım Komutları

```bash
npm run dev           # React frontend
npm run server        # Express backend
npm run make:admin    # CLI ile admin kullanıcı oluştur
npm run migrate       # SQL tablolarını çalıştır
```

---

🧠 Bu proje: kurumsal yapıların dijitalleşmesinde temel altyapı sağlayacak şekilde modüler ve genişletilebilir yapıda planlandı.

🛠️ Güncelleme tarihi: 2025-05-07
