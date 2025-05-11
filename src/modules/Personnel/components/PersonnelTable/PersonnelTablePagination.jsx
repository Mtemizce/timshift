// src/modules/Personnel/components/PersonnelTable/PersonnelTablePagination.jsx

export default function PersonnelTablePagination({ currentPage, setCurrentPage, pageCount, totalCount }) {
  return (
    <div className="flex justify-between items-center mt-4 text-sm text-gray-600 dark:text-gray-300">
      <span>
        Toplam: <b>{totalCount}</b> kayıt
      </span>
      <div className="flex gap-2 items-center">
        <button
          onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
          className="px-3 py-1 rounded border bg-white dark:bg-gray-800"
        >
          Önceki
        </button>
        <span>
          Sayfa {currentPage} / {pageCount}
        </span>
        <button
          onClick={() => setCurrentPage((p) => Math.min(p + 1, pageCount))}
          className="px-3 py-1 rounded border bg-white dark:bg-gray-800"
        >
          Sonraki
        </button>
      </div>
    </div>
  );
}
