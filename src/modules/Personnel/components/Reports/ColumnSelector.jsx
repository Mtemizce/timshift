// src/modules/Personnel/components/Reports/ColumnSelector.jsx

import { useEffect, useState } from "react";
import { columnOptions } from "./columnConfig";

export default function ColumnSelector({ selectedColumns, setSelectedColumns, headerOptions, setHeaderOptions }) {
  const [showHeaderOptions, setShowHeaderOptions] = useState(headerOptions.enabled);

  useEffect(() => {
    const saved = localStorage.getItem("personnel-report-columns");
    if (saved) {
      setSelectedColumns(JSON.parse(saved));
    } else {
      const defaults = {};
      columnOptions.forEach((c) => (defaults[c.key] = true));
      setSelectedColumns(defaults);
    }
  }, [setSelectedColumns]);

  const toggle = (key) => {
    const next = { ...selectedColumns, [key]: !selectedColumns[key] };
    setSelectedColumns(next);
    localStorage.setItem("personnel-report-columns", JSON.stringify(next));
  };

  const handleHeaderChange = (e) => {
    const { name, value } = e.target;
    setHeaderOptions((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-4">
      <h3 className="font-semibold">📌 Kolon Seçimi</h3>
      <div className="flex flex-wrap gap-2">
        {columnOptions.map((col) => (
          <label key={col.key} className="flex items-center gap-1 text-sm">
            <input
              type="checkbox"
              checked={selectedColumns[col.key] || false}
              onChange={() => toggle(col.key)}
            />
            {col.label}
          </label>
        ))}
      </div>

      <label className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          checked={showHeaderOptions}
          onChange={(e) => {
            const checked = e.target.checked;
            setShowHeaderOptions(checked);
            setHeaderOptions((prev) => ({ ...prev, enabled: checked }));
          }}
        />
        Özel Üst Başlık Ekle
      </label>

      {showHeaderOptions && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-800 p-4 rounded shadow">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Metin</label>
            <textarea
              name="text"
              rows={3}
              className="input"
              value={headerOptions.text}
              onChange={handleHeaderChange}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Yazı Rengi</label>
            <input
              type="color"
              name="textColor"
              value={headerOptions.textColor}
              onChange={handleHeaderChange}
              className="h-10 w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Arkaplan Rengi</label>
            <input
              type="color"
              name="bgColor"
              value={headerOptions.bgColor}
              onChange={handleHeaderChange}
              className="h-10 w-full"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Yazı Konumu</label>
            <select name="textAlign" value={headerOptions.textAlign} onChange={handleHeaderChange} className="input">
              <option value="left">Sola Yasla</option>
              <option value="center">Ortala</option>
              <option value="right">Sağa Yasla</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Yazı Boyutu</label>
            <input
              type="number"
              name="fontSize"
              value={headerOptions.fontSize}
              onChange={handleHeaderChange}
              className="input"
            />
          </div>
        </div>
      )}
    </div>
  );
}
