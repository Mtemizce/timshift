// src/modules/Personnel/pages/Reports.jsx

import { useState } from "react";
import Conditions from "../components/Reports/Conditions";
import ReportTable from "../components/Reports/ReportTable";
import ColumnSelector from "../components/Reports/ColumnSelector";

export default function Reports() {
  const [rows, setRows] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState({});
  const [headerOptions, setHeaderOptions] = useState({
    enabled: false,
    text: "",
    bgColor: "#000000",
    textColor: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold">📊 Rapor Oluştur</h1>

      <Conditions onSearch={setRows} />

      <ColumnSelector
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        headerOptions={headerOptions}
        setHeaderOptions={setHeaderOptions}
      />

      <ReportTable
        rows={rows}
        selectedColumns={selectedColumns}
        headerOptions={headerOptions}
      />
    </div>
  );
}
