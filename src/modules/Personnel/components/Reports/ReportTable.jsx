import ExportActions from "./ExportActions";

export default function ReportTable({
  filteredData,
  selectedColumns,
  columnLabels,
  customPageTitle,
  pageOptions
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
          customPageTitle={customPageTitle}
          pageOptions={pageOptions}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="reportTableHeadTr">
              <th className="reportTableHeadTh">#</th>
              {selectedColumns.map((colKey) => (
                <th
                  key={colKey}
                  className="reportTableHeadTh"
                >
                  {columnLabels[colKey] || colKey}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="reportTableBodyTr">
                <td className="reportTableBodyTd">{idx + 1}</td>
                {selectedColumns.map((colKey) => (
                  <td key={colKey} className="reportTableBodyTd">
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
