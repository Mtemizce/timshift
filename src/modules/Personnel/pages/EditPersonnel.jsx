// src/modules/Personnel/pages/EditPersonnel.jsx

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function EditPersonnel() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/personnel/${id}`, {
      headers: { Authorization: localStorage.getItem("admin") },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Kayıt alınamadı");
        return res.json();
      })
      .then((data) => {
        const convertDate = (iso) => {
          if (!iso) return "";
          const d = new Date(iso);
          return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
        };

        setForm({
          ...data,
          birth_date: convertDate(data.birth_date),
          start_date: convertDate(data.start_date),
        });
        setLoading(false);
      })
      .catch(() => {
        Swal.fire("Hata", "Personel verisi alınamadı", "error");
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { ...form };

    const res = await fetch(`http://localhost:3001/api/personnel/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("admin"),
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.json();
      return Swal.fire({ icon: "error", title: "Sunucu Hatası", text: err.error || "Güncelleme başarısız" });
    }

    Swal.fire({ toast: true, icon: "success", title: "Güncelleme başarılı", showConfirmButton: false, timer: 2000 });
    navigate("/personnel");
  };

  if (loading) return <div className="text-center p-10">Yükleniyor...</div>;

  return (
    <form id="personnel-form" className="max-w-5xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold mb-4">Personel Güncelle</h2>

      <h3 className="text-lg font-semibold mb-2">👤 KİŞİSEL BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input label="Ad Soyad" name="name" value={form.name || ""} onChange={handleChange} />
        <Input label="TC Kimlik No" name="tc_no" value={form.tc_no || ""} onChange={handleChange} />
        <Input label="Telefon" name="phone" value={form.phone || ""} onChange={handleChange} />
        <Input label="E-Posta" name="email" value={form.email || ""} onChange={handleChange} />
        <Input label="Doğum Tarihi" name="birth_date" type="date" value={form.birth_date || ""} onChange={handleChange} />
        <Input label="Çocuk Sayısı" name="children_count" type="number" value={form.children_count || ""} onChange={handleChange} />
        <Select label="Medeni Durum" name="marital_status" value={form.marital_status || ""} onChange={handleChange} options={["Evli", "Bekar", "Boşanmış"]} />
        <Input label="İşe Giriş Tarihi" name="start_date" type="date" value={form.start_date || ""} onChange={handleChange} />
      </div>

      <h3 className="text-lg font-semibold mb-2">📏 BEDEN ÖLÇÜLERİ</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Select label="Pantolon" name="size_pants" value={form.size_pants || ""} onChange={handleChange} options={["XS", "S", "M", "L", "XL", "2XL", "3XL"]} />
        <Select label="Tişört" name="size_tshirt" value={form.size_tshirt || ""} onChange={handleChange} options={["XS", "S", "M", "L", "XL", "2XL", "3XL"]} />
        <Select label="Mont" name="size_coat" value={form.size_coat || ""} onChange={handleChange} options={["XS", "S", "M", "L", "XL", "2XL", "3XL"]} />
        <Select label="Ayakkabı No" name="size_shoes" value={form.size_shoes || ""} onChange={handleChange} options={Array.from({ length: 14 }, (_, i) => (i + 37).toString())} />
      </div>

      <h3 className="text-lg font-semibold mb-2">📄 DİĞER BİLGİLER</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Input label="Adres" name="address" value={form.address || ""} onChange={handleChange} />
        <Select label="Sicil Kaydı" name="criminal_record" value={form.criminal_record || ""} onChange={handleChange} options={["Var", "Yok"]} />
        <Input label="Sertifikalar" name="certificates" value={form.certificates || ""} onChange={handleChange} />
        <Input label="Birim" name="department" value={form.department || ""} onChange={handleChange} />
        <Select label="Görev" name="role" value={form.role || ""} onChange={handleChange} options={["Araç Arkası", "Şoför", "Mıntıka", "WC Tuvaletler"]} />
        <Input label="Ehliyet Sınıfı" name="driving_license" value={form.driving_license || ""} onChange={handleChange} />
        <Select label="Eğitim Düzeyi" name="education_level" value={form.education_level || ""} onChange={handleChange} options={["Okumamış", "İlkokul", "Ortaokul", "Lise", "Ön Lisans", "Lisans"]} />
        <Input label="IBAN" name="iban" value={form.iban || ""} onChange={handleChange} />
      </div>

      <div className="flex justify-end gap-2">
        <button type="button" onClick={() => navigate("/personnel")} className="px-4 py-2 rounded bg-gray-300">
          Geri Dön
        </button>
        <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">
          Güncelle
        </button>
      </div>
    </form>
  );
}

function Input({ label, name, type = "text", value, onChange }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">
        {label}
      </label>
      <input id={name} name={name} type={type} value={value} onChange={onChange} className="input" autoComplete="off" />
    </div>
  );
}

function Select({ label, name, value, onChange, options }) {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-1 font-medium">
        {label}
      </label>
      <select id={name} name={name} value={value} onChange={onChange} className="input" autoComplete="off">
        <option value="">Seçiniz</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
