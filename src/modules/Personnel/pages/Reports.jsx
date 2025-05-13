import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Conditions from "../components/Reports/Conditions";
import ColumnSelector from "../components/Reports/ColumnSelector";
import PageOptions from "../components/Reports/PageOptions";
import ReportTable from "../components/Reports/ReportTable";
import { fetchWithAuth } from "../../../lib/fetchWithAuth";
import { Page } from "@react-pdf/renderer";

const columnOptions = [
  { key: "name", label: "Ad Soyad" },
  { key: "tc_no", label: "TC Kimlik No" },
  { key: "phone", label: "Telefon" },
  { key: "email", label: "E-Posta" },
  { key: "birth_date", label: "Doğum Tarihi", type: "date" },
  { key: "children_count", label: "Çocuk Sayısı" },
  { key: "marital_status", label: "Medeni Durum", type: "select", options: ["Evli", "Bekar", "Boşanmış"] },
  { key: "start_date", label: "İşe Giriş Tarihi", type: "date" },
  { key: "address", label: "Adres" },
  { key: "criminal_record", label: "Sicil Kaydı", type: "select", options: ["Var", "Yok"] },
  { key: "department", label: "Departman" },
  { key: "role", label: "Görev", type: "select", options: ["Araç Arkası", "Şoför", "Mıntıka", "WC Tuvaletler"] },
];

const columnLabels = Object.fromEntries(columnOptions.map((col) => [col.key, col.label]));
const labelToKeyMap = Object.fromEntries(columnOptions.map((col) => [col.label, col.key]));
const columnKeys = columnOptions.map((col) => col.key);

export default function Reports() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(columnKeys);
  const [headerOptions, setHeaderOptions] = useState({
    text: "Personel Raporu",
    align: "center",
    fontSize: 16,
    showHeader: true,
  });
  const [pageOptions, setPageOptions] = useState({
    orientation: "portrait",
    showLogo: false,
  });

  useEffect(() => {
    const storedCols = JSON.parse(localStorage.getItem("personnel-report-columns"));
    const storedHeader = JSON.parse(localStorage.getItem("personnel-report-header"));
    const storedPage = JSON.parse(localStorage.getItem("personnel-page-option"));
    if (storedCols && Array.isArray(storedCols)) setSelectedColumns(storedCols);
    if (storedHeader) setHeaderOptions((prev) => ({ ...prev, ...storedHeader }));
    if (storedPage) setPageOptions((prev) => ({ ...prev, ...storedPage }));
  }, []);

  const handleReport = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:3001/api/personnel");
      const result = await res.json();
      setData(result);

      if (!conditions.length) {
        setFilteredData(result);
        return;
      }

      const filtered = result.filter((row) =>
        conditions.every((cond) => {
          const key = labelToKeyMap[cond.field];
          const val = row[key];
          const search = cond.value?.toLowerCase();
          if (!key || val === undefined || val === null) return false;

          if (typeof val === "string" && val.includes("T")) {
            const formatted = new Date(val).toLocaleDateString("tr-TR");
            return formatted.includes(search);
          }

          if (typeof val === "string") return val.toLowerCase().includes(search);
          if (typeof val === "number") return val.toString().includes(search);

          return false;
        })
      );

      if (filtered.length === 0) {
        Swal.fire({
          toast: true,
          position: "top-end",
          icon: "info",
          title: "Eşleşen kayıt bulunamadı!",
          showConfirmButton: false,
          timer: 2500,
        });
      }

      setFilteredData(filtered);
    } catch (err) {
      console.error("Veri çekme hatası:", err);
      Swal.fire("Hata", "Personel verileri alınamadı", "error");
    }
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
      <PageOptions pageOptions={pageOptions} setPageOptions={setPageOptions} />
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
          pageOptions={pageOptions}
        />
      )}
    </div>
  );
}
