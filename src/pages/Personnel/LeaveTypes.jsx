import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../lib/fetchWithAuth";
import { Plus, Trash2, Pencil } from "lucide-react";

export default function LeaveTypes() {
  const [types, setTypes] = useState([]);
  const [form, setForm] = useState({ name: "", description: "", default_days: "" });

  useEffect(() => {
    fetchTypes();
  }, []);

  const fetchTypes = async () => {
    const res = await fetchWithAuth("http://localhost:3001/api/leave-types");
    const data = await res.json();
    setTypes(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? "PUT" : "POST";
    const url = form.id
      ? `http://localhost:3001/api/leave-types/${form.id}`
      : "http://localhost:3001/api/leave-types";

    const res = await fetchWithAuth(url, {
      method,
      body: JSON.stringify(form),
    });

    if (res.ok) {
      setForm({ name: "", description: "", default_days: "" });
      fetchTypes();
    } else {
      alert("İşlem başarısız");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Silmek istediğine emin misin?")) {
      const res = await fetchWithAuth(`http://localhost:3001/api/leave-types/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchTypes();
      else alert("Silinemedi");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📅 İzin Türleri</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded shadow mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            placeholder="İzin adı"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            required
          />
          <input
            name="description"
            placeholder="Açıklama"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          />
          <input
            type="number"
            name="default_days"
            placeholder="Gün"
            value={form.default_days}
            onChange={(e) => setForm({ ...form, default_days: e.target.value })}
            className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
            required
          />
        </div>
        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700">
          <Plus className="w-4 h-4" />
          {form.id ? "Güncelle" : "Ekle"}
        </button>
      </form>

      <table className="w-full border dark:border-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="p-2 border dark:border-gray-600">Ad</th>
            <th className="p-2 border dark:border-gray-600">Açıklama</th>
            <th className="p-2 border dark:border-gray-600">Gün</th>
            <th className="p-2 border dark:border-gray-600">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {types.map((type) => (
            <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border p-2 dark:border-gray-700">{type.name}</td>
              <td className="border p-2 dark:border-gray-700">{type.description}</td>
              <td className="border p-2 dark:border-gray-700">{type.default_days}</td>
              <td className="border p-2 dark:border-gray-700 space-x-2">
                <button
                  onClick={() => setForm(type)}
                  className="text-blue-600 hover:underline"
                >
                  <Pencil className="inline w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(type.id)}
                  className="text-red-600 hover:underline"
                >
                  <Trash2 className="inline w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
