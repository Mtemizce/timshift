// src/modules/Personnel/components/Reports/ReportTable.jsx

import ExportActions from "./ExportActions";

export default function ReportTable({ rows, selectedColumns, headerOptions }) {
  if (!rows.length) return null;

  const visibleKeys = Object.keys(selectedColumns).filter((key) => selectedColumns[key]);
  const headers = visibleKeys.map((key) => ({
    key,
    label: headerOptions.columnLabels?.[key] || key,
  }));

  return (
    <div className="mt-6 space-y-2">
      <ExportActions rows={rows} columns={headers} headerOptions={headerOptions} />

      <div className="overflow-x-auto">
        <table className="w-full border dark:border-gray-600 text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {headers.map((h) => (
                <th key={h.key} className="p-2 border dark:border-gray-600">{h.label}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                {headers.map((h) => (
                  <td key={h.key} className="p-2 border dark:border-gray-700">{row[h.key] || "-"}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
