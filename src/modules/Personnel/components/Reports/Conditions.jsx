// src/modules/Personnel/components/Reports/Conditions.jsx

import { useState } from "react";
import { columnOptions } from "./columnConfig";

export default function Conditions({ onSearch }) {
  const [conditions, setConditions] = useState([]);

  const handleAdd = () => {
    setConditions([...conditions, { field: "", value: "" }]);
  };

  const handleChange = (i, key, val) => {
    const next = [...conditions];
    next[i][key] = val;
    setConditions(next);
  };

  const handleRemove = (i) => {
    setConditions(conditions.filter((_, idx) => idx !== i));
  };

  const handleSearch = async () => {
    const res = await fetch("http://localhost:3001/api/personnel", {
      headers: { Authorization: localStorage.getItem("admin") },
    });
    let list = await res.json();

    conditions.forEach((c) => {
      const col = columnOptions.find((o) => o.key === c.field);
      if (col?.type === "select") {
        list = list.filter((p) => p[c.field] === c.value);
      } else {
        list = list.filter((p) => p[c.field]?.toString().toLowerCase().includes(c.value.toLowerCase()));
      }
    });

    onSearch(list);
  };

  return (
    <div className="space-y-2">
      <h3 className="font-semibold">Koşullar</h3>
      {conditions.map((c, i) => (
        <div key={i} className="flex gap-2 items-center">
          <select
            className="input"
            value={c.field}
            onChange={(e) => handleChange(i, "field", e.target.value)}
          >
            <option value="">Kolon Seç</option>
            {columnOptions.map((o) => (
              <option key={o.key} value={o.key}>{o.label}</option>
            ))}
          </select>

          {columnOptions.find((o) => o.key === c.field)?.type === "select" ? (
            <select
              className="input"
              value={c.value}
              onChange={(e) => handleChange(i, "value", e.target.value)}
            >
              <option value="">Seçiniz</option>
              {columnOptions.find((o) => o.key === c.field)?.options?.map((o) => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          ) : (
            <input
              className="input"
              value={c.value}
              onChange={(e) => handleChange(i, "value", e.target.value)}
              placeholder="Değer girin"
            />
          )}

          <button onClick={() => handleRemove(i)} className="btn">❌</button>
        </div>
      ))}
      <div className="flex gap-2 mt-2">
        <button onClick={handleAdd} className="btn">➕ Koşul Ekle</button>
        <button onClick={handleSearch} className="btn bg-blue-600 text-white">🔍 Raporu Getir</button>
      </div>
    </div>
  );
}
