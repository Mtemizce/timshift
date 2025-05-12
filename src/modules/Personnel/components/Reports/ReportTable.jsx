import ExportActions from "./ExportActions";

export default function ReportTable({
  filteredData,
  selectedColumns,
  columnLabels,
  headerOptions,
}) {
  const data = Array.isArray(filteredData) ? filteredData : [];

  if (data.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-4">
        Gösterilecek kayıt bulunamadı.
      </p>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex justify-end mb-4">
        <ExportActions
          data={data}
          selectedColumns={selectedColumns}
          columnLabels={columnLabels}
          headerOptions={headerOptions}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 text-sm dark:text-white dark:divide-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {selectedColumns.map((colKey) => (
                <th
                  key={colKey}
                  className="px-6 py-3 text-left font-medium text-gray-700 dark:text-white whitespace-nowrap"
                >
                  {columnLabels[colKey] || colKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700 bg-white dark:bg-gray-900">
            {data.map((row, idx) => (
              <tr key={idx}>
                {selectedColumns.map((colKey) => (
                  <td key={colKey} className="px-6 py-4 whitespace-nowrap">
                    {typeof row[colKey] === "string" && /^\d{4}-\d{2}-\d{2}T/.test(row[colKey])
                      ? new Date(row[colKey]).toLocaleDateString("tr-TR")
                      : row[colKey] ?? "-"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
