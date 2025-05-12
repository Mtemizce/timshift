import { handleExport } from "./exportUtils";
import { FileText, FileDown, Printer } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PersonnelReportPDF from "./pdf/PersonnelReportPDF";



export default function ExportActions({ data, selectedColumns, columnLabels, headerOptions }) {
  const pdfKey = JSON.stringify({
  data,
  selectedColumns,
  columnLabels,
  headerOptions,
});
  return (
    
    <div className="flex gap-2">
      {data?.length > 0 && selectedColumns?.length > 0 && (
        <PDFDownloadLink
          key={pdfKey} // yeniden oluşturulmasını zorla
          document={<PersonnelReportPDF data={data} selectedColumns={selectedColumns} columnLabels={columnLabels} headerOptions={headerOptions} />}
          fileName="personel_raporu.pdf"
        >
          {({ loading }) => (
            <button title="PDF" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer">
              <FileText size={18} />
            </button>
          )}
        </PDFDownloadLink>
      )}

      <button title="Excel" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => handleExport("excel", data, selectedColumns, columnLabels, headerOptions)}>
        <FileDown size={18} />
      </button>
      <button title="Yazdır" className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer" onClick={() => handleExport("print", data, selectedColumns, columnLabels, headerOptions)}>
        <Printer size={18} />
      </button>
    </div>
  );
}
