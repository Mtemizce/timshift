// ✅ exportUtils.js - PDF: Türkçe karakter destekli font, metin hizalama, doğru kullanıcı adı
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const getCurrentUserName = () => {
  try {
    const userStr = localStorage.getItem("admins");
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

  // Font ekleme ve kullanma
 
    doc.setFont("Times", "normal");
  

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

  const columns = selectedColumns.map((col) => ({ header: columnLabels[col] || col, dataKey: col }));

  autoTable(doc, {
    startY: headerOptions?.showHeader && headerOptions.text ? 30 + (headerOptions.text.split("\n").length * 8) : 10,
    head: [columns.map((c) => c.header)],
    body: data.map((row) => columns.map((c) => {
      const val = row[c.dataKey];
      return typeof val === "string" && val.includes("T") ? formatDate(val) : val ?? "";
    })),
    styles: { font: "Roboto" },
  });

  doc.setFontSize(10);
  doc.text(`Düzenleyen: ${user}`, 14, doc.lastAutoTable.finalY + 10);
  doc.text(`Tarih: ${now}`, 14, doc.lastAutoTable.finalY + 15);
  doc.text(`Toplam Kayıt: ${data.length}`, 14, doc.lastAutoTable.finalY + 20);

  doc.save("rapor.pdf");
};
