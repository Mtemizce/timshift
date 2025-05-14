import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

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

const getCurrentUserName = () => {
  try {
    const userStr = localStorage.getItem("admin");
    if (!userStr) return "Bilinmeyen Kullanıcı";
    const user = JSON.parse(userStr);
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
  
  const doc = new jsPDF({ orientation: headerOptions.orientation || "portrait" });
  const user = getCurrentUserName();
  const now = new Date().toLocaleString("tr-TR");

  doc.setFont("Robotor", "normal"); // Türkçe karakter desteği

  const pageWidth = doc.internal.pageSize.getWidth();
  const x = headerOptions.align === "center"
    ? pageWidth / 2
    : headerOptions.align === "right"
    ? pageWidth - 14
    : 14;

  if (headerOptions?.showHeader && headerOptions.text) {
    doc.setFontSize(headerOptions.fontSize || 16);
    doc.setTextColor(headerOptions.textColor || 0);
    doc.setFillColor(headerOptions.bgColor || 255);
    const lines = headerOptions.text.split("\n");
    lines.forEach((line, i) => {
      doc.text(line, x, 20 + (i * 8), { align: headerOptions.align || "left" });
    });
  }

  const columns = selectedColumns.map((col) => ({
    header: columnLabels[col] || col,
    dataKey: col,
  }));

  autoTable(doc, {
    startY: headerOptions?.showHeader && headerOptions.text
      ? 30 + (headerOptions.text.split("\n").length * 8)
      : 10,
    head: [columns.map((c) => c.header)],
    body: data.map((row) =>
      columns.map((c) => {
        const val = row[c.dataKey];
        return typeof val === "string" && /^\d{4}-\d{2}-\d{2}T/.test(val)
          ? new Date(val).toLocaleDateString("tr-TR")
          : val ?? "";
      })
    ),
    styles: { font: "Roboto" },
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

  const sheetData = [];

  if (headerOptions?.showHeader && headerOptions.text) {
    const lines = headerOptions.text.split("\n");
    lines.forEach((line) => sheetData.push([line]));
    sheetData.push([""]);
  }

  sheetData.push(headerRow);
  sheetData.push(...bodyRows);
  sheetData.push([""]);
  sheetData.push([`Düzenleyen: ${user}`]);
  sheetData.push([`Tarih: ${now}`]);
  sheetData.push([`Toplam Kayıt: ${data.length}`]);

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
        h2 { text-align: ${headerOptions.align || "left"}; font-size: ${headerOptions.fontSize || 16}px; margin-bottom: 20px; color: ${headerOptions.textColor || "#000"}; background-color: ${headerOptions.bgColor || "#fff"}; padding: 10px; }
      </style>
    </head>
    <body>
      ${
        headerOptions?.showHeader && headerOptions.text
          ? `<h2>${headerOptions.text.replace(/\n/g, "<br>")}</h2>`
          : ""
      }
      ${tableHTML}
      <div style="margin-top: 20px;">
        <p>Düzenleyen: ${user}</p>
        <p>Tarih: ${now}</p>
        <p>Toplam Kayıt: ${data.length}</p>
      </div>
      <script>setTimeout(() => window.close(), 3000);</script>
    </body>
    </html>`);
  printWindow.document.close();
  printWindow.print();
};
