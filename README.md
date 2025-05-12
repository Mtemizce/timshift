# timShiftApp

**Vardiya Takip Sistemi**

## 🎯 Amaç

Bu uygulama, sadece müdürlük bünyesindeki yetkili kişiler tarafından kullanılan, masaüstü üzerinde çalışan, haftalık nöbet ve ay sonu puantaj oluşturmayı sağlayan sade ama güçlü bir görev takip sistemidir.

## 🧱 Teknoloji Stack

- ⚛️ ReactJS (arayüz)
- 💅 TailwindCSS (stil)
- 🟨 Node.js (sunucu işlemleri, aynı yapı içinde)
- 🐬 MySQL (veritabanı)
- 🔐 bcrypt (parola güvenliği)
- 📅 date-fns (tarih hesapları)
- 📄 jsPDF / xlsx (PDF ve Excel çıktıları)

## ⚙️ Ana Modüller

- **Yönetici Girişi:** CLI ile oluşturulan kullanıcılar giriş yapabilir.
- **Personel Yönetimi:** Aktif/çıkış yapmış personeller; bilgiler detaylı tutulur.
- **Nöbet Planlama:** Hafta sonu (pazar) için 3-4 haftalık döngüyle otomatik plan.
- **İzin & Mesai:** Hafta bazlı izin/mesai işaretleme.
- **Puantaj:** Ay sonunda nöbet, izin ve mesai bilgisiyle puantaj oluşturma.
- **Raporlama:** PDF/Excel çıktısı alınabilir.
- **Veri Güvenliği:** Hiçbir kayıt silinmez, tüm geçmiş tutulur.
- **Kimin Ne Yaptığı:** Tüm işlemler kullanıcı kimliğiyle loglanır.

## 📁 Proje Yapısı
```
timshiftApp/
├── public/ -> favicon, fonts
├── src/ -> ön yüz
│ ├── components/ → Arayüz bileşenleri
│ ├── pages/ → Giriş, dashboard, vs.
│ └── App.jsx
├── server/ → MySQL bağlantısı, sunucu işlemleri
│ ├── db.js
│ ├── auth.js
│ ├── personel.js
│ └── ...
├── cli/
│ └── make-admin.js → Yönetici oluşturma komutu
│ └── migrate.js → sql klasöründeki veritabanı tablolarını oluşturur (npm run migrate)
├── package.json
```

## 🚀 Başlangıç Komutları

```bash
npm install              # Tüm paketleri yükle
npm run server           # Backend işlemleri için başlat
npm run start            # React arayüzü başlat
npm run migrate            # sql tabloları oluşturur

npm run make:admin       # Yönetici oluştur (CLI)

🛠 Notlar
Sistem tek cihazda çalışır, internet gerekmez.

Build alındığında masaüstü kullanımı mümkündür (npm run build).

Yetkili dışında kimse erişemez.

Veriler MySQL'de güvenle saklanır.