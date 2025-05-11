// src/modules/Personnel/components/Reports/ExportActions.jsx

import { handleExport } from "./exportUtils";

export default function ExportActions({ rows, columns, headerOptions }) {
  const exportFile = (type) => {
    handleExport({ type, rows, columns, headerOptions });
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <button onClick={() => exportFile("xlsx")} className="btn">📥 Excel</button>
      <button onClick={() => exportFile("pdf")} className="btn">📄 PDF</button>
      <button onClick={() => exportFile("print")} className="btn">🖨️ Yazdır</button>
    </div>
  );
}
