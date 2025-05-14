import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Conditions from "../components/Reports/Conditions";
import ColumnSelector from "../components/Reports/ColumnSelector";
import CustomPageTitle from "../components/Reports/CustomPageTitle";
import PageOptions from "../components/Reports/PageOptions";
import ReportTable from "../components/Reports/ReportTable";
import { fetchWithAuth } from "../../../lib/fetchWithAuth"; 
import {Home, ListFilter, BookType,Columns3Cog} from "lucide-react";

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
  const [customPageTitle, setCustomPageTitle] = useState({
    text: "Personel Raporu",
    align: "center",
    fontSize: 16,
    showTitle: true,
  });
  const [pageOptions, setPageOptions] = useState({
    orientation: "portrait",
    showLogo: false,
  });
  const [activeTab, setActiveTab] = useState("columns");

  useEffect(() => {
    const storedCols = JSON.parse(localStorage.getItem("personnel-report-columns"));
    const storedPageTitle = JSON.parse(localStorage.getItem("personnel-report-page-title"));
    const storedPage = JSON.parse(localStorage.getItem("personnel-page-option"));
    if (storedCols && Array.isArray(storedCols)) setSelectedColumns(storedCols);
    if (storedPageTitle) setCustomPageTitle((prev) => ({ ...prev, ...storedPageTitle }));
    if (storedPage) setPageOptions((prev) => ({ ...prev, ...storedPage }));
  }, []);

  const handleReport = async () => {
    try {
      const res = await fetchWithAuth("http://localhost:3001/api/personnel");
      const result = await res.json();
      setData(result);
       Swal.fire({
          toast: true,
          position: "top-end",
          icon: "success",
          title: "Kayıtlar başarıyla getirildi!",
          showConfirmButton: false,
          timer: 2500,
        });

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
          icon: "error",
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
    <div className="w-full md:w-9/12 mx-auto flex flex-col p-2 justify-center items-center">
      {/* Sekmeler */}
      <div className="w-full mb-4">
        <div className="flex flex-wrap border-b border-gray-300 dark:border-gray-600">
          <button className={`flex justify-between align-middle space-x-2 py-2 px-4 text-sm font-medium ${activeTab === "columns" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`} onClick={() => setActiveTab("columns")}>
           <Home size={18} /> <span>Kolonlar</span>
           
          </button>
          <button className={`flex justify-between align-middle space-x-2 py-2 px-4 text-sm font-medium ${activeTab === "conditions" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`} onClick={() => setActiveTab("conditions")}>
            <ListFilter size={18} /> <span>Filtreler</span>
            
          </button>
          <button className={`flex justify-between align-middle space-x-2 py-2 px-4 text-sm font-medium ${activeTab === "pagetitle" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`} onClick={() => setActiveTab("pagetitle")}>
            <BookType size={18} /> <span>Üst Başlık</span>
            
          </button>
          <button className={`flex justify-between align-middle space-x-2 py-2 px-4 text-sm font-medium ${activeTab === "page" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500 hover:text-blue-600"}`} onClick={() => setActiveTab("page")}>
            <Columns3Cog size={18} /> <span>Sayfa Ayarları</span>
          </button>
        </div>

        {/* Sekme içerikleri */}
        <div className="mt-4">
          {activeTab === "conditions" && <Conditions conditions={conditions} setConditions={setConditions} />}
          {activeTab === "columns" && <ColumnSelector selectedColumns={selectedColumns} setSelectedColumns={setSelectedColumns} columnLabels={columnLabels} />}
          {activeTab === "pagetitle" && <CustomPageTitle customPageTitle={customPageTitle} setCustomPageTitle={setCustomPageTitle} />}  
          {activeTab === "page" && <PageOptions pageOptions={pageOptions} setPageOptions={setPageOptions} />}
        </div>
      </div>
      <div className="flex justify-center items-center gap-4 my-4">
        <button onClick={handleReport} className="font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm cursor-pointer transition-colors duration-300">
          Raporu Getir
        </button>
      </div>

      {filteredData.length > 0 && <ReportTable filteredData={filteredData} selectedColumns={selectedColumns} columnLabels={columnLabels} customPageTitle={customPageTitle} pageOptions={pageOptions} />}
    </div>
  );
}
