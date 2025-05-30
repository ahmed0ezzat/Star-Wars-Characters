interface PaginationProps {
  readonly page: number;
  readonly totalPages: number;
  readonly onPageChange: (newPage: number) => void;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mt-12 gap-4">
      <button
        onClick={() => onPageChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className={`px-5 py-2 rounded-lg font-medium transition-all ${
          page === 1
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg'
        }`}
      >
        Previous
      </button>
      <span className="text-gray-300 text-sm sm:text-base">
        Page <span className="font-bold">{page}</span> of <span className="font-bold">{totalPages}</span>
      </span>
      <button
        onClick={() => onPageChange(Math.min(totalPages, page + 1))}
        disabled={page === totalPages}
        className={`px-5 py-2 rounded-lg font-medium transition-all ${
          page === totalPages
            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
            : 'bg-yellow-500 text-gray-900 hover:bg-yellow-400 shadow-lg'
        }`}
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
