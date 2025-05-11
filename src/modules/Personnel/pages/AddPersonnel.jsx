// src/modules/Personnel/pages/AddPersonnel.jsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AddPersonnel() {
  const navigate = useNavigate();
  const [tcValid, setTcValid] = useState(null);

  const isValidTC = (tc) => {
    if (!/^[0-9]{11}$/.test(tc)) return false;
    let digits = tc.split("").map(Number);
    let sumOdd = digits[0] + digits[2] + digits[4] + digits[6] + digits[8];
    let sumEven = digits[1] + digits[3] + digits[5] + digits[7];
    let digit10 = (sumOdd * 7 - sumEven) % 10;
    let digit11 = digits.slice(0, 10).reduce((a, b) => a + b) % 10;
    return digits[9] === digit10 && digits[10] === digit11;
  };

  const checkTcDuplicate = async (tc) => {
    const res = await fetch("http://localhost:3001/api/personnel", {
      headers: { Authorization: localStorage.getItem("admin") },
    });
    const list = await res.json();
    return list.some((p) => p.tc_no === tc);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const formEntries = Object.fromEntries(formData.entries());
    const errors = [];

    if (!formEntries.tc_no) {
      errors.push("TC Kimlik No zorunlu.");
      setTcValid(false);
    } else if (!isValidTC(formEntries.tc_no)) {
      errors.push("TC Kimlik No geçersiz.");
      setTcValid(false);
    } else {
      const exists = await checkTcDuplicate(formEntries.tc_no);
      if (exists) {
        errors.push("Bu TC zaten kayıtlı.");
        setTcValid(false);
      } else {
        setTcValid(true);
      }
    }

    if (errors.length > 0) {
      return Swal.fire({ icon: "error", title: "Form Hataları", html: errors.join("<br>") });
    }

    const res = await fetch("http://localhost:3001/api/personnel", {
      method: "POST",
      headers: { Authorization: localStorage.getItem("admin") },
      body: formData,
    });

    if (!res.ok) {
      const err = await res.json();
      return Swal.fire({ icon: "error", title: "Sunucu Hatası", text: err.error || "Kayıt başarısız" });
    }

    Swal.fire({ toast: true, icon: "success", title: "Kayıt başarılı", showConfirmButton: false, timer: 2000 });
    navigate("/personnel");
  };

  return (
    <form
      id="personnel-form"
      className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow"
      onSubmit={handleSubmit}
    >
      <h2 className="text-2xl font-bold mb-4">Yeni Personel</h2>

      <h3 className="text-lg font-semibold mb-2">👤 KİŞİSEL BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <label className="flex flex-col">
          <span>Ad Soyad *</span>
          <input name="name" className="input" autoComplete="off" />
        </label>
        <label className="flex flex-col">
          <span>TC Kimlik No *</span>
          <input name="tc_no" className={`input ${tcValid === false ? "border-red-500" : tcValid === true ? "border-green-500" : ""}`} autoComplete="off" />
        </label>
        <label className="flex flex-col">
          <span>Telefon *</span>
          <input name="phone" className="input" autoComplete="off" />
        </label>
        <label className="flex flex-col">
          <span>E-Posta</span>
          <input name="email" className="input" autoComplete="off" />
        </label>
        <label className="flex flex-col">
          <span>Doğum Tarihi</span>
          <input name="birth_date" type="date" className="input" autoComplete="off" />
        </label>
        <label className="flex flex-col">
          <span>Çocuk Sayısı</span>
          <input name="children_count" type="number" className="input" autoComplete="off" />
        </label>
        <label className="flex flex-col">
          <span>Medeni Durum</span>
          <select name="marital_status" className="input" autoComplete="off">
            <option value="">Seçiniz</option>
            <option>Evli</option>
            <option>Bekar</option>
            <option>Boşanmış</option>
          </select>
        </label>
        <label className="flex flex-col">
          <span>İşe Giriş Tarihi</span>
          <input name="start_date" type="date" className="input" autoComplete="off" />
        </label>
      </div>

      <h3 className="text-lg font-semibold mb-2">📏 BEDEN ÖLÇÜLERİ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Pantolon", name: "size_pants" },
          { label: "Tişört", name: "size_tshirt" },
          { label: "Mont", name: "size_coat" },
          { label: "Ayakkabı No", name: "size_shoes", options: Array.from({ length: 14 }, (_, i) => (i + 37)) }
        ].map(({ label, name, options }) => (
          <label key={name} className="flex flex-col">
            <span>{label}</span>
            <select name={name} className="input" autoComplete="off">
              <option value="">Seçiniz</option>
              {(options || ["XS", "S", "M", "L", "XL", "2XL", "3XL"]).map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </label>
        ))}
      </div>

      <h3 className="text-lg font-semibold mb-2">📄 DİĞER BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {[
          { label: "Adres", name: "address" },
          { label: "Sicil Kaydı", name: "criminal_record", options: ["Var", "Yok"] },
          { label: "Sertifikalar", name: "certificates" },
          { label: "Birim", name: "department" },
          { label: "Görev", name: "role", options: ["Araç Arkası", "Şoför", "Mıntıka", "WC Tuvaletler"] },
          { label: "Ehliyet Sınıfı", name: "driving_license" },
          { label: "Eğitim Düzeyi", name: "education_level", options: ["Okumamış", "İlkokul", "Ortaokul", "Lise", "Ön Lisans", "Lisans"] },
          { label: "IBAN", name: "iban" },
        ].map(({ label, name, options }) => (
          <label key={name} className="flex flex-col">
            <span>{label}</span>
            {options ? (
              <select name={name} className="input" autoComplete="off">
                <option value="">Seçiniz</option>
                {options.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : (
              <input name={name} className="input" autoComplete="off" />
            )}
          </label>
        ))}

        <label className="flex flex-col">
          <span>Profil Fotoğrafları</span>
          <input name="image_file" type="file" className="input" />
        </label>
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => navigate("/personnel")} className="px-4 py-2 rounded bg-gray-300">
          Geri Dön
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          Kaydet
        </button>
      </div>
    </form>
  );
}
