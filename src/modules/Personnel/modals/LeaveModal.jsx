// src/modules/Personnel/modals/LeaveModal.jsx
import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { fetchWithAuth } from "../../../lib/fetchWithAuth";
import Swal from "sweetalert2";
import { beApiUrl } from './../../../lib/config.js';

export default function LeaveModal({ isOpen, onClose, personnel, onSuccess }) {
  const [form, setForm] = useState({
    leaveType: "",
    startDate: "",
    endDate: "",
    description: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

 const handleSubmit = async () => {
  try {
    const res = await fetchWithAuth(`${beApiUrl}/leave-records`, {
      method: "POST",
      body: JSON.stringify({
        personnelId: personnel.id,
        ...form,
      }),
    });

    if (!res.ok) throw new Error("Sunucu hatası");

    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "İzin başarıyla verildi",
      showConfirmButton: false,
      timer: 2000,
    });

    onSuccess();
    onClose();
  } catch (err) {
    console.error("İzin kaydı başarısız:", err);
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "error",
      title: "İşlem başarısız",
      showConfirmButton: false,
      timer: 2500,
    });
  }
};
  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow w-full max-w-md">
          <Dialog.Title className="text-lg font-bold mb-4">İzin Ver - {personnel?.name}</Dialog.Title>
          
          <div className="space-y-3">
            <select name="leaveType" value={form.leaveType} onChange={handleChange} className="w-full p-2 border rounded">
              <option value="">İzin Türü Seçin</option>
              <option value="Yıllık">Yıllık</option>
              <option value="Mazeret">Mazeret</option>
              <option value="Doğum">Doğum</option>
              {/* leaveTypes API'den çekilip dinamik de yapılabilir */}
            </select>
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} className="w-full p-2 border rounded" />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} className="w-full p-2 border rounded" />
            <textarea name="description" value={form.description} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Açıklama (opsiyonel)" />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 dark:bg-zinc-700">İptal</button>
            <button onClick={handleSubmit} className="px-4 py-2 rounded bg-blue-600 text-white">Kaydet</button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}
