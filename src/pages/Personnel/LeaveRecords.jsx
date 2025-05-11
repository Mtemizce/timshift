import { useEffect, useState } from "react";
import { fetchWithAuth } from "../../lib/fetchWithAuth";
import { Plus, Trash2 } from "lucide-react";

export default function LeaveRecords() {
  const [records, setRecords] = useState([]);
  const [personnel, setPersonnel] = useState([]);
  const [leaveTypes, setLeaveTypes] = useState([]);
  const [form, setForm] = useState({
    personnel_id: "",
    leave_type_id: "",
    start_date: "",
    end_date: "",
    used_days: "",
    reason: "",
  });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [r1, r2, r3] = await Promise.all([
      fetchWithAuth("http://localhost:3001/api/personnel-leave-records").then((r) => r.json()),
      fetchWithAuth("http://localhost:3001/api/personnel").then((r) => r.json()),
      fetchWithAuth("http://localhost:3001/api/leave-types").then((r) => r.json()),
    ]);
    setRecords(r1);
    setPersonnel(r2.filter(p => !p.is_quitting));
    setLeaveTypes(r3);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetchWithAuth("http://localhost:3001/api/personnel-leave-records", {
      method: "POST",
      body: JSON.stringify(form),
    });
    if (res.ok) {
      fetchAll();
      setForm({
        personnel_id: "",
        leave_type_id: "",
        start_date: "",
        end_date: "",
        used_days: "",
        reason: "",
      });
    } else {
      alert("Kayıt başarısız");
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Silmek istediğinize emin misiniz?")) {
      const res = await fetchWithAuth(`http://localhost:3001/api/personnel-leave-records/${id}`, {
        method: "DELETE",
      });
      if (res.ok) fetchAll();
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📝 İzin Kullanım Kayıtları</h1>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-4 rounded shadow mb-6 grid md:grid-cols-6 gap-4">
        <select
          name="personnel_id"
          value={form.personnel_id}
          onChange={(e) => setForm({ ...form, personnel_id: e.target.value })}
          className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          required
        >
          <option value="">Personel</option>
          {personnel.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>

        <select
          name="leave_type_id"
          value={form.leave_type_id}
          onChange={(e) => setForm({ ...form, leave_type_id: e.target.value })}
          className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          required
        >
          <option value="">İzin Türü</option>
          {leaveTypes.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>

        <input
          type="date"
          name="start_date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          required
        />
        <input
          type="date"
          name="end_date"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          required
        />
        <input
          type="number"
          name="used_days"
          value={form.used_days}
          onChange={(e) => setForm({ ...form, used_days: e.target.value })}
          placeholder="Gün"
          className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
          required
        />
        <input
          type="text"
          name="reason"
          value={form.reason}
          onChange={(e) => setForm({ ...form, reason: e.target.value })}
          placeholder="Açıklama"
          className="border p-2 rounded dark:bg-gray-900 dark:border-gray-700 dark:text-white"
        />

        <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700 col-span-full md:col-span-2">
          <Plus className="w-4 h-4" />
          Ekle
        </button>
      </form>

      <table className="w-full border text-sm dark:border-gray-700">
        <thead className="bg-gray-100 dark:bg-gray-700 text-left">
          <tr>
            <th className="p-2 border dark:border-gray-600">Personel</th>
            <th className="p-2 border dark:border-gray-600">İzin Türü</th>
            <th className="p-2 border dark:border-gray-600">Başlangıç</th>
            <th className="p-2 border dark:border-gray-600">Bitiş</th>
            <th className="p-2 border dark:border-gray-600">Gün</th>
            <th className="p-2 border dark:border-gray-600">Açıklama</th>
            <th className="p-2 border dark:border-gray-600">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border p-2 dark:border-gray-700">{r.personnel_name}</td>
              <td className="border p-2 dark:border-gray-700">{r.leave_type_name}</td>
              <td className="border p-2 dark:border-gray-700">{r.start_date}</td>
              <td className="border p-2 dark:border-gray-700">{r.end_date}</td>
              <td className="border p-2 dark:border-gray-700">{r.used_days}</td>
              <td className="border p-2 dark:border-gray-700">{r.reason}</td>
              <td className="border p-2 dark:border-gray-700">
                <button onClick={() => handleDelete(r.id)} className="text-red-600 hover:underline">
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
