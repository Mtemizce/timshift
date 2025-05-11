📝 Proje Özeti (README için Markdown)
markdown
Kopyala
Düzenle
# timShiftApp

**Temizlik İşleri Müdürlüğü Vardiya Takip Sistemi**

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

timshiftApp/
├── public/
├── src/
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
├── package.json

bash
Kopyala
Düzenle

## 🚀 Başlangıç Komutları

```bash
npm install              # Tüm paketleri yükle
npm run server           # Backend işlemleri için başlat
npm run start            # React arayüzü başlat
npm run make:admin       # Yönetici oluştur (CLI)
🛠 Notlar
Sistem tek cihazda çalışır, internet gerekmez.

Build alındığında masaüstü kullanımı mümkündür (npm run build).

Yetkili dışında kimse erişemez.

Veriler MySQL'de güvenle saklanır.

yaml
Kopyala
Düzenle

---

## ✅ Şimdi Ne Yapalım?

Sen bu `package.json` ile kurulumu yap:  
```bash
npm install
Sonra istersen adım adım şu işleri birlikte başlatalım:

server/db.js → MySQL bağlantısını kur

cli/make-admin.js → Yönetici oluşturma komutu

server/auth.js → Giriş kontrolünü yaz

src/pages/Login.jsx → Giriş ekranı

Hazırsan 1. adımı başlatalım: server/db.js ve MySQL bağlantı ayarlarını kurayım mı?

🔧 Stack için package.json – Başlangıç Setup
Aşağıdaki package.json dosyası:

ReactJS + Tailwind arayüzünü içerir

Node.js içinde çalışan basit bir backend (tek yapıda)

MySQL bağlantısı, şifreleme, tarih hesapları, PDF/Excel desteği

json
Kopyala
Düzenle
{
  "name": "timshiftapp",
  "version": "1.0.0",
  "description": "Temizlik İşleri Müdürlüğü Vardiya Takip Sistemi",
  "main": "index.js",
  "scripts": {
    "start": "react-scripts start",
    "server": "node server/index.js",
    "make:admin": "node cli/make-admin.js",
    "build": "react-scripts build"
  },
  "dependencies": {
    "bcrypt": "^5.1.0",
    "date-fns": "^3.3.0",
    "express": "^4.18.2",
    "jspdf": "^2.5.1",
    "mysql2": "^3.6.0",
    "xlsx": "^0.18.5"
  },
  "devDependencies": {
    "tailwindcss": "^3.4.1",
    "autoprefixer": "^10.4.14",
    "postcss": "^8.4.24",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1"
  }
}







Tabii dostum, işte projenin **güncel özeti**, yapılanlar ve sıradaki adımları içeren detaylı bir tablo:

---

## 🧠 **TimShiftApp - Proje Özeti**

### ✅ YAPILANLAR

| Modül                                   | Özellik                                 | Açıklama                                                                                                |
| --------------------------------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| **Personel Yönetimi**                   | Personel ekleme/güncelleme/çıkış        | `AddPersonnel`, `EditPersonnel`, çıkış işlemi (`PATCH`) tamamlandı.                                     |
| **Tablo**                               | Arama, filtreleme, sayfalama            | `name`, `tc_no`, `role` filtreleri ve pagination eklendi.                                               |
| **Dropdown İşlem Menüsü**               | Dışarı taşırarak görünürlük düzeltildi. |                                                                                                         |
| **Export (Tablo Üzerinde)**             | Excel, PDF, Yazdır                      | Fullscreen ve export butonları eklendi. PDF'de `autoTable` için çalışma yapıldı.                        |
| **Kolon Seçimi (LocalStorage)**         | Görünür kolonları seçme ve kaydetme     | `ColumnSelector` bileşeni ile localStorage destekli yapı kuruldu.                                       |
| **Rapor Ekranı** (`/personnel/reports`) | Rapor oluştur, filtrele, çıktı al       | `Conditions`, `ColumnSelector`, `ReportTable`, `ExportActions` modüler yapılarla oluşturuldu.           |
| **Koşul Ekle**                          | Çoklu dinamik filtre yapısı             | Her bir koşul dinamik olarak field tipine göre render ediliyor.                                         |
| **Özel Üst Başlık (headerOptions)**     | PDF/Excel/Print başlığı                 | Metin, hizalama, renk ve yazı tipi büyüklüğü tanımlanabiliyor. PDF ve yazdırma ekranında destekleniyor. |

---

### ⚠️ SORUNLAR & EKSİKLER

| Durum                                                                                                           | Açıklama |
| --------------------------------------------------------------------------------------------------------------- | -------- |
| ❌ PDF başlıklarda Türkçe karakter hatası devam ediyor.                                                          |          |
| ❌ Excel’de özel başlık tablonun altına ekleniyor, üstte ve renklendirmeli olması gerek.                         |          |
| ❌ Yazdır ekranında özel başlık style uygulanmıyor.                                                              |          |
| ❌ `columnConfig`'te tanımlanan başlıklar yerine exportta ham db field’ları (`name`, `tc_no` vs) kullanılıyor.   |          |
| ⚠️ `exportUtils.js` dosyasındaki bazı kullanımlar hataya sebep oldu (örneğin `doc.autoTable`, `cell.s.border`). |          |
| ⚠️ Export butonları çalışmaz hâle geldi (geri alındı).                                                          |          |
| ⚠️ `ColumnSelector` altında özel başlık bileşenleri eksik (textarea, align, fontsize).                          |          |

---

### 🧭 DEVAMINDA YAPILACAKLAR

| Öncelik | Yapılacak                                                                                  |
| ------- | ------------------------------------------------------------------------------------------ |
| 🎯 1.   | `exportUtils.js` revize edilerek PDF, Excel ve Yazdır işlemleri sorunsuz hale getirilecek. |
| 🎯 2.   | Export çıktılarında `columnConfig.js` başlıkları kullanılacak.                             |
| 🎯 3.   | `ColumnSelector` içinde özel başlık bileşeni eski haline dönecek.                          |
| 🎯 4.   | Export çıktılarında özel başlıklar doğru stil ile tablo üstüne eklenecek.                  |
| 🎯 5.   | Yazdır ekranı `window.print()` sonrası otomatik kapanacak.                                 |
| ⚙️ 6.   | Koşul alanı UI iyileştirilecek (görsel uyum, boşluklar, sadeleştirme).                     |

---

Yeni chate geçtiğinde bu özetle kolayca devam edebiliriz. Hadi bakalım, yeni sayfada daha temiz ve sağlam ilerleyelim! Hazırsan sen başlat 😎
