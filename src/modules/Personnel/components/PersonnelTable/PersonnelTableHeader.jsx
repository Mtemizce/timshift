// src/modules/Personnel/components/PersonnelTable/PersonnelTableHeader.jsx

import { Maximize } from "lucide-react";
import { FileSpreadsheet } from "lucide-react";
import { Printer } from "lucide-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function PersonnelTableHeader({ exportMode, setExportMode, filtered, data }) {
  const handleExport = (type) => {
    const exportData = exportMode === "filtered" ? filtered : data;

    const columns = [
      "Ad Soyad",
      "TC No",
      "E-Posta",
      "Telefon",
      "Çocuk Sayısı",
      "Medeni Durum",
      "Doğum Tarihi",
      "İşe Giriş",
      "Departman",
      "Görev",
      "Ehliyet",
      "Eğitim",
      "IBAN",
      "Pantolon",
      "Tişört",
      "Mont",
      "Ayakkabı"
    ];

    const rows = exportData.map((p) => [
      p.name,
      p.tc_no,
      p.email,
      p.phone,
      p.children_count,
      p.marital_status,
      p.birth_date,
      p.start_date,
      p.department,
      p.role,
      p.driving_license,
      p.education_level,
      p.iban,
      p.size_pants,
      p.size_tshirt,
      p.size_coat,
      p.size_shoes
    ]);

    if (type === "xlsx") {
      const worksheet = XLSX.utils.aoa_to_sheet([columns, ...rows]);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Personeller");
      XLSX.writeFile(workbook, `personeller.${"xlsx"}`);
    }

    if (type === "pdf") {
      const doc = new jsPDF(exportMode === "all" ? { orientation: "landscape" } : {});
      autoTable(doc, {
        head: [columns],
        body: rows,
        styles: { fontSize: 8 },
      });
      doc.save("personeller.pdf");
    }

    if (type === "print") {
      const html = `
        <html>
        <head>
          <title>Yazdır</title>
          <style>
            table { border-collapse: collapse; width: 100%; font-size: 12px; }
            th, td { border: 1px solid #ccc; padding: 5px; text-align: left; }
          </style>
        </head>
        <body>
          <h3>Personel Listesi</h3>
          <table>
            <thead>
              <tr>${columns.map((c) => `<th>${c}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${rows.map((r) => `<tr>${r.map((c) => `<td>${c || ""}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
        </body>
        </html>
      `;
      const win = window.open("", "_blank");
      win.document.write(html);
      win.document.close();
      win.print();
    }
  };

  const handleFullscreen = () => {
    const el = document.getElementById("personnel-section");
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      el.requestFullscreen().catch(() => {});
    }
  };

  return (
    <div className="flex flex-col md:flex-row justify-start items-center gap-4 mt-6 mb-2">
      
        <div className="flex items-center gap-2">
          <select value={exportMode} onChange={(e) => setExportMode(e.target.value)} className="w-full border rounded p-2">
          <option value="filtered">Filtrelenmiş Veriler</option>
          <option value="all">Tüm Veriler</option>
        </select>
        </div>
        <div className="flex gap-2">
          <button onClick={() => handleExport("xlsx")} className="tableBtn tableBtnExcel" title="Excel"><FileSpreadsheet /></button>
        <button onClick={() => handleExport("pdf")} className="tableBtn tableBtnPdf" title="PDF">PDF</button>
        <button onClick={() => handleExport("print")} className="tableBtn tableBtnPrint" title="Yazdır"><Printer /></button>
        <button onClick={handleFullscreen} className="tableBtn tableBtnFullscreen" title="Tam Ekran">
          <Maximize className="w-4 h-4" />
        </button>
        </div>
    
    </div>
  );
}
