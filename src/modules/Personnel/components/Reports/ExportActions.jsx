import { handleExport } from "./exportUtils";
import { FileText, FileDown, Printer } from "lucide-react";

export default function ExportActions({
  data,
  selectedColumns,
  columnLabels,
  headerOptions,
}) {
  return (
    <div className="flex gap-2">
      <button
        title="PDF"
        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
        onClick={() =>
          handleExport("pdf", data, selectedColumns, columnLabels, headerOptions)
        }
      >
        <FileText size={18} />
      </button>
      <button
        title="Excel"
        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
        onClick={() =>
          handleExport("excel", data, selectedColumns, columnLabels, headerOptions)
        }
      >
        <FileDown size={18} />
      </button>
      <button
        title="Yazdır"
        className="hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded cursor-pointer"
        onClick={() =>
          handleExport("print", data, selectedColumns, columnLabels, headerOptions)
        }
      >
        <Printer size={18} />
      </button>
    </div>
  );
}
