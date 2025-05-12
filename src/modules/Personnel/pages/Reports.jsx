// ✅ Tam revize edilmiş Reports.jsx (tüm yapıyı toparlayan son sürüm)
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Conditions from "../components/Reports/Conditions";
import ColumnSelector from "../components/Reports/ColumnSelector";
import ReportTable from "../components/Reports/ReportTable";

const columnOptions = [
  { key: "name", label: "Ad Soyad" },
  { key: "tc_no", label: "TC Kimlik No" },
  { key: "phone", label: "Telefon" },
  { key: "email", label: "E-Posta" },
  { key: "birth_date", label: "Doğum Tarihi" },
  { key: "children_count", label: "Çocuk Sayısı" },
  { key: "marital_status", label: "Medeni Durum" },
  { key: "start_date", label: "İşe Giriş Tarihi" },
  { key: "address", label: "Adres" },
  { key: "criminal_record", label: "Sicil Kaydı" },
  { key: "department", label: "Departman" },
  { key: "role", label: "Görev" },
];

const columnLabels = Object.fromEntries(columnOptions.map((col) => [col.key, col.label]));
const labelToKeyMap = Object.fromEntries(columnOptions.map((col) => [col.label, col.key]));
const columnKeys = columnOptions.map((col) => col.key);

export default function Reports({ data = [] }) {
  const [conditions, setConditions] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(columnKeys);
  const [headerOptions, setHeaderOptions] = useState({
    text: "Personel Raporu",
    align: "center",
    fontSize: 16,
    showHeader: true,
  });
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const storedCols = JSON.parse(localStorage.getItem("personnel-report-columns"));
    const storedHeader = JSON.parse(localStorage.getItem("personnel-report-header"));
    if (storedCols && Array.isArray(storedCols)) setSelectedColumns(storedCols);
    if (storedHeader) setHeaderOptions((prev) => ({ ...prev, ...storedHeader }));
  }, []);

  const handleReport = () => {
    if (!Array.isArray(data)) return setFilteredData([]);
    if (!conditions.length) return setFilteredData(data);

    const result = data.filter((row) =>
      conditions.every((cond) => {
        const key = labelToKeyMap[cond.field];
        if (!key || !row[key]) return false;
        return row[key].toString().toLowerCase().includes(cond.value?.toLowerCase());
      })
    );

    if (result.length === 0) {
      Swal.fire({
        toast: true,
        position: "top-end",
        icon: "info",
        title: "Eşleşen kayıt bulunamadı!",
        showConfirmButton: false,
        timer: 2500,
      });
    }

    setFilteredData(result);
  };

  return (
    <div className="container mx-auto p-4 justify-center items-center flex flex-col">
      <Conditions conditions={conditions} setConditions={setConditions} />

      <ColumnSelector
        selectedColumns={selectedColumns}
        setSelectedColumns={setSelectedColumns}
        columnLabels={columnLabels}
        headerOptions={headerOptions}
        setHeaderOptions={setHeaderOptions}
      />

      <div className="flex justify-center items-center gap-4 my-4">
        <button
          onClick={handleReport}
          className="font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer transition-colors duration-300"
        >
          Raporu Getir
        </button>
      </div>

      {filteredData.length > 0 && (
        <ReportTable
          filteredData={filteredData}
          selectedColumns={selectedColumns}
          columnLabels={columnLabels}
          headerOptions={headerOptions}
        />
      )}
    </div>
  );
}
