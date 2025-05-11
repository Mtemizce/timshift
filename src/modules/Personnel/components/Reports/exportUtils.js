// src/modules/Personnel/components/Reports/exportUtils.js

import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

function sanitize(text) {
  return text?.replace(/[\u00A0-\u9999<>\&]/gim, i => '&#' + i.charCodeAt(0) + ';') || "";
}

export function handleExport({ type, rows, columns, headerOptions }) {
  const visibleColumns = Array.isArray(columns) ? columns : [];
  const headers = visibleColumns.map((c) => c.label);
  const data = rows.map((row) => visibleColumns.map((c) => row[c.key]));

  if (type === "xlsx") {
    const sheet = XLSX.utils.aoa_to_sheet([headers, ...data]);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, sheet, "Personeller");

    if (headerOptions.enabled && headerOptions.text) {
      const lines = headerOptions.text.split("\n");
      lines.reverse().forEach((line) => {
        XLSX.utils.sheet_add_aoa(sheet, [[line]], { origin: -1 });
      });
    }

    XLSX.writeFile(wb, "personeller.xlsx");
  }

  if (type === "pdf") {
    const doc = new jsPDF();
    if (headerOptions.enabled && headerOptions.text) {
      const lines = headerOptions.text.split("\n");
      doc.setFontSize(headerOptions.fontSize || 14);
      doc.setTextColor(headerOptions.textColor || "#000000");
      doc.setFillColor(headerOptions.bgColor || "#ffffff");

      lines.forEach((line, i) => {
        doc.text(line, 105, 10 + i * 10, { align: headerOptions.textAlign || "left" });
      });
    }

    autoTable(doc, {
      head: [headers],
      body: data,
      startY: headerOptions.enabled ? 20 : 10,
    });

    doc.save("personeller.pdf");
  }

  if (type === "print") {
    const win = window.open("", "_blank");
    const styles = `
      <style>
        table { border-collapse: collapse; width: 100%; }
        th, td { border: 1px solid #000; padding: 4px; }
        .header { background: ${headerOptions.bgColor}; color: ${headerOptions.textColor}; font-size: ${headerOptions.fontSize}px; text-align: ${headerOptions.textAlign}; padding: 10px; }
      </style>
    `;
    const header = headerOptions.enabled && headerOptions.text
      ? `<div class="header">${headerOptions.text.replace(/\n/g, "<br/>")}</div>`
      : "";

    const html = `
      <html>
        <head><title>Yazdır</title>${styles}</head>
        <body>
          ${header}
          <table>
            <thead>
              <tr>${headers.map((h) => `<th>${h}</th>`).join("")}</tr>
            </thead>
            <tbody>
              ${data.map((row) => `<tr>${row.map((v) => `<td>${v || "-"}</td>`).join("")}</tr>`).join("")}
            </tbody>
          </table>
          <script>
            window.onload = function() {
              setTimeout(() => {
                window.print();
                window.close();
              }, 500);
            }
          </script>
        </body>
      </html>
    `;

    win.document.write(html);
    win.document.close();
  }
}
