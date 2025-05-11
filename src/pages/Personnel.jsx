import { useEffect, useState } from "react";
import PersonnelForm from "../components/PersonnelForm";
import { fetchWithAuth } from "../lib/fetchWithAuth";

export default function Personnel() {
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // 'all', 'active', 'passive'
  const [personnel, setPersonnel] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    name: "",
    tc_no: "",
    role: "Araç Arkası",
  });

  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    const res = await fetchWithAuth("http://localhost:3001/api/personnel");
    const data = await res.json();
    setPersonnel(data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://localhost:3001/api/personnel/${form.id}`
      : "http://localhost:3001/api/personnel";

    const res = await fetchWithAuth(url, {
      method,
      body: JSON.stringify(form),
    });

    if (res.ok) {
      await fetchPersonnel();
      setForm({ name: "", tc_no: "", role: "Araç Arkası" });
      setShowForm(false);
    } else {
      alert(method === "POST" ? "Ekleme başarısız" : "Güncelleme başarısız");
    }
  };

  const filteredPersonnel = personnel.filter((p) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      p.name.toLowerCase().includes(searchLower) ||
      p.tc_no.includes(search);

    const statusMatch =
      filterStatus === "all" ||
      (filterStatus === "active" && !p.is_quitting) ||
      (filterStatus === "passive" && p.is_quitting);

    return matchesSearch && statusMatch;
  });

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Personel Listesi</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          + Yeni Personel
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Ad veya TC ile ara"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        />

        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="border p-2 rounded w-full md:w-1/3"
        >
          <option value="all">Tüm Personeller</option>
          <option value="active">Sadece Aktifler</option>
          <option value="passive">Sadece Pasifler</option>
        </select>
      </div>

      {showForm && (
        <PersonnelForm
          form={form}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={() => setShowForm(false)}
        />
      )}

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Ad Soyad</th>
            <th className="p-2 border">TC</th>
            <th className="p-2 border">Görev</th>
            <th className="p-2 border">Durum</th>
            <th className="p-2 border">İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {filteredPersonnel.map((p) => (
            <tr key={p.id}>
              <td className="border p-2">{p.name}</td>
              <td className="border p-2">{p.tc_no}</td>
              <td className="border p-2">{p.role}</td>
              <td className="border p-2">
                {p.is_quitting ? (
                  <span className="text-red-600">Pasif</span>
                ) : (
                  <span className="text-green-600">Aktif</span>
                )}
              </td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => {
                    setForm({
                      name: p.name,
                      tc_no: p.tc_no,
                      role: p.role,
                      id: p.id,
                    });
                    setShowForm(true);
                  }}
                  className="text-blue-600"
                >
                  Düzenle
                </button>
                {!p.is_quitting && (
                  <button
                    onClick={async () => {
                      if (confirm("İşten çıkarmak istediğine emin misin?")) {
                        const res = await fetchWithAuth(
                          `http://localhost:3001/api/personnel/${p.id}/quit`,
                          { method: "PATCH" }
                        );
                        if (res.ok) fetchPersonnel();
                        else alert("İşten çıkarılamadı");
                      }
                    }}
                    className="text-red-600"
                  >
                    Pasifleştir
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
