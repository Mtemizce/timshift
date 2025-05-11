// src/modules/Personnel/components/PersonnelTable/PersonnelTableBody.jsx

import { MoreVertical } from "lucide-react";

export default function PersonnelTableBody({
  paginatedData,
  dropdownId,
  dropdownPos,
  toggleDropdown,
  handleEdit,
  handleQuit,
  openLeaveModal,
  buttonRefs,
  filtered
}) {
  return (
    <div className="overflow-x-auto relative z-0">
      <table className="w-full border dark:border-gray-700 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-700">
          <tr>
            <th className="p-2 border dark:border-gray-600">Ad Soyad</th>
            <th className="p-2 border dark:border-gray-600">Görev</th>
            <th className="p-2 border dark:border-gray-600">Durum</th>
            <th className="p-2 border dark:border-gray-600">İzin</th>
            <th className="p-2 border dark:border-gray-600 text-center">İşlem</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((p) => (
            <tr key={p.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="border p-2 dark:border-gray-700">{p.name}</td>
              <td className="border p-2 dark:border-gray-700">{p.role}</td>
              <td className="border p-2 dark:border-gray-700">Çalışıyor</td>
              <td className="border p-2 dark:border-gray-700">-</td>
              <td className="border p-2 dark:border-gray-700 text-center relative">
                <button
                  ref={(el) => (buttonRefs.current[p.id] = el)}
                  onClick={() => toggleDropdown(p.id)}
                  className="dropdown-toggle p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
                >
                  <MoreVertical className="w-4 h-4" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Dropdown Menü */}
      {dropdownId && (
        <div
          className="dropdown-menu fixed z-50 w-40 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow"
          style={{ top: `${dropdownPos.top}px`, left: `${dropdownPos.left}px` }}
        >
          <button onClick={() => handleEdit(dropdownId)} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            Güncelle
          </button>
          <button onClick={() => handleQuit(dropdownId)} className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700">
            Çıkış Ver
          </button>
          <button
            onClick={() => openLeaveModal(filtered.find((p) => p.id === dropdownId))}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            İzin Ver
          </button>
        </div>
      )}
    </div>
  );
}
