// ✅ Tam revize edilmiş ColumnSelector.jsx - renk, yön ve önizleme destekli
import { Sun, Moon } from "lucide-react";

export default function ColumnSelector({ selectedColumns, setSelectedColumns, columnLabels  }) {
  const toggleColumn = (key) => {
    const updated = selectedColumns.includes(key) ? selectedColumns.filter((k) => k !== key) : [...selectedColumns, key];
    setSelectedColumns(updated);
    localStorage.setItem("personnel-report-columns", JSON.stringify(updated));
  };



  return (
    <div className="w-full">
       
      <div className="p-4 bg-white rounded-md shadow-md dark:bg-gray-800 mb-2">
        <div className="grid grid-cols-2 md:grid-cols-3 lg.grid-cols-4 xl:grid-cols-6 gap-2">
          {Object.entries(columnLabels).map(([key, label]) => (
            <label key={key} className="flex items-center gap-2 text-sm">
              <input type="checkbox" checked={selectedColumns.includes(key)} onChange={() => toggleColumn(key)} className="accent-blue-600" />
              {label}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
