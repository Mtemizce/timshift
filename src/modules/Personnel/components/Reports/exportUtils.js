import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

// Kullanıcı bilgisi alımı
const getCurrentUserName = () => {
  try {
    const user = JSON.parse(localStorage.getItem("admins"));
    return user?.name || "Bilinmeyen Kullanıcı";
  } catch {
    return "Bilinmeyen Kullanıcı";
  }
};

const formatDate = (dateStr) => {
  try {
    const date = new Date(dateStr);
    return date.toLocaleDateString("tr-TR");
  } catch {
    return dateStr;
  }
};

export const exportToPDF = (data, selectedColumns, columnLabels, headerOptions = {}) => {
  const doc = new jsPDF();

  const user = getCurrentUserName();
  const now = new Date().toLocaleString("tr-TR");

  if (headerOptions.text) {
    doc.setFontSize(headerOptions.fontSize || 16);
    doc.text(headerOptions.text, 14, 20, { align: headerOptions.align || "left" });
  }

  const columns = selectedColumns.map((col) => ({
    header: columnLabels[col] || col,
    dataKey: col,
  }));

  autoTable(doc, {
    startY: headerOptions.text ? 30 : 10,
    head: [columns.map((c) => c.header)],
    body: data.map((row) =>
      columns.map((c) => {
        const val = row[c.dataKey];
        return typeof val === "string" && val.includes("T") ? formatDate(val) : val ?? "";
      })
    ),
    styles: { font: "helvetica" },
  });

  doc.setFontSize(10);
  doc.text(`Düzenleyen: ${user}`, 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Tarih: ${now}`, 14, doc.lastAutoTable.finalY + 15);
  doc.text(`Toplam Kayıt: ${data.length}`, 14, doc.lastAutoTable.finalY + 20);

  doc.save("rapor.pdf");
};

export const exportToExcel = (data, selectedColumns, columnLabels, headerOptions = {}) => {
  const user = getCurrentUserName();
  const now = new Date().toLocaleString("tr-TR");

  const headerRow = selectedColumns.map((col) => columnLabels[col] || col);
  const bodyRows = data.map((row) =>
    selectedColumns.map((col) => {
      const val = row[col];
      return typeof val === "string" && val.includes("T") ? formatDate(val) : val ?? "";
    })
  );

  const sheetData = [
    [headerOptions.text || "Personel Raporu"],
    [""],
    headerRow,
    ...bodyRows,
    [""],
    [`Düzenleyen: ${user}`],
    [`Tarih: ${now}`],
    [`Toplam Kayıt: ${data.length}`],
  ];

  const ws = XLSX.utils.aoa_to_sheet(sheetData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Rapor");
  XLSX.writeFile(wb, "rapor.xlsx");
};

export const exportToPrint = (data, selectedColumns, columnLabels, headerOptions = {}) => {
  const user = getCurrentUserName();
  const now = new Date().toLocaleString("tr-TR");

  const tableHTML = `
    <table>
      <thead><tr>
        ${selectedColumns.map((col) => `<th>${columnLabels[col] || col}</th>`).join("")}
      </tr></thead>
      <tbody>
        ${data
          .map(
            (row) =>
              `<tr>${selectedColumns
                .map((col) => {
                  const val = row[col];
                  const formatted = typeof val === "string" && val.includes("T") ? formatDate(val) : val;
                  return `<td>${formatted ?? ""}</td>`;
                })
                .join("")}</tr>`
          )
          .join("")}
      </tbody>
    </table>`;

  const printWindow = window.open("", "_blank");
  printWindow.document.write(`
    <html>
    <head>
      <title>Yazdır</title>
      <style>
        body { font-family: Arial; padding: 20px; }
        table { border-collapse: collapse; width: 100%; margin-top: 20px; }
        th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
        h2 { text-align: ${headerOptions.align || "left"}; font-size: ${
    headerOptions.fontSize || 16
  }px; margin-bottom: 20px; }
      </style>
    </head>
    <body>
      ${headerOptions.text ? `<h2>${headerOptions.text}</h2>` : ""}
      ${tableHTML}
      <div style="margin-top: 20px;">
        <p>Düzenleyen: ${user}</p>
        <p>Tarih: ${now}</p>
        <p>Toplam Kayıt: ${data.length}</p>
      </div>
    </body>
    </html>`);
  printWindow.document.close();
  printWindow.print();
};

export const handleExport = (format, data, selectedColumns, columnLabels, headerOptions) => {
  switch (format) {
    case "pdf":
      return exportToPDF(data, selectedColumns, columnLabels, headerOptions);
    case "excel":
      return exportToExcel(data, selectedColumns, columnLabels, headerOptions);
    case "print":
      return exportToPrint(data, selectedColumns, columnLabels, headerOptions);
    default:
      console.error("Geçersiz format:", format);
  }
};
