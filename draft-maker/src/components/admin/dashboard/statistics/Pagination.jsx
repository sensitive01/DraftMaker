import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

const Pagination = ({
  itemsPerPage,
  setItemsPerPage,
  indexOfFirstItem,
  filteredBookings,
  indexOfLastItem,
  paginate,
  currentPage,
  totalPages,
}) => {
  const renderPageButtons = () => {
    const maxVisibleButtons = 3;
    const pageNumbers = [];

    if (totalPages <= maxVisibleButtons) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      let startPage, endPage;

      if (currentPage <= 2) {
        startPage = 1;
        endPage = 3;
        pageNumbers.push(...Array.from({ length: 3 }, (_, i) => i + 1));

        if (totalPages > 3) {
          pageNumbers.push("...");
          pageNumbers.push(totalPages);
        }
      } else if (currentPage >= totalPages - 1) {
        pageNumbers.push(1);
        pageNumbers.push("...");

        startPage = totalPages - 2;
        endPage = totalPages;
        pageNumbers.push(...Array.from({ length: 3 }, (_, i) => startPage + i));
      } else {
        pageNumbers.push(1);

        if (currentPage > 3) {
          pageNumbers.push("...");
        }

        pageNumbers.push(currentPage - 1);
        pageNumbers.push(currentPage);
        pageNumbers.push(currentPage + 1);

        if (currentPage < totalPages - 2) {
          pageNumbers.push("...");
        }

        pageNumbers.push(totalPages);
      }
    }

    return pageNumbers.map((page, index) => {
      if (page === "...") {
        return (
          <span
            key={`ellipsis-${index}`}
            className="relative inline-flex items-center px-3 py-2 border border-red-300 bg-white text-sm font-medium text-gray-500"
          >
            ...
          </span>
        );
      }

      return (
        <button
          key={page}
          onClick={() => paginate(page)}
          className={`relative inline-flex items-center px-3 py-2 border ${
            currentPage === page
              ? "bg-red-50 border-red-500 text-red-600 z-10"
              : "border-red-300 bg-white text-red-500 hover:bg-red-50"
          } text-sm font-medium`}
        >
          {page}
        </button>
      );
    });
  };

  const goToFirstPage = () => paginate(1);
  const goToLastPage = () => paginate(totalPages);

  const showJumpButtons = totalPages > 5;

  return (
    <div className="px-5 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-red-100 gap-4">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-600">Show</span>
        <select
          value={itemsPerPage}
          onChange={(e) => {
            setItemsPerPage(Number(e.target.value));
            paginate(1);
          }}
          className="form-select rounded-md border-red-200 text-sm focus:border-red-500 focus:ring focus:ring-red-200"
          aria-label="Items per page"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
        </select>
        <span className="text-sm text-gray-600">entries</span>
      </div>

      <div className="hidden md:block">
        <p className="text-sm text-gray-600">
          Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
          <span className="font-medium">
            {Math.min(indexOfLastItem, filteredBookings.length)}
          </span>{" "}
          of <span className="font-medium">{filteredBookings.length}</span>{" "}
          entries
        </p>
      </div>

      <div className="flex flex-wrap justify-center">
        <nav
          className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
        >
          {showJumpButtons && (
            <button
              onClick={goToFirstPage}
              disabled={currentPage === 1}
              className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-red-300 bg-white text-sm font-medium text-red-500 ${
                currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-50"
              }`}
              aria-label="First page"
            >
              <ChevronsLeft size={16} />
            </button>
          )}

          <button
            onClick={() => paginate(currentPage > 1 ? currentPage - 1 : 1)}
            disabled={currentPage === 1}
            className={`relative inline-flex items-center px-2 py-2 ${
              !showJumpButtons ? "rounded-l-md" : ""
            } border border-red-300 bg-white text-sm font-medium text-red-500 ${
              currentPage === 1
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-50"
            }`}
            aria-label="Previous page"
          >
            <ChevronLeft size={16} />
          </button>

          {renderPageButtons()}

          <button
            onClick={() =>
              paginate(currentPage < totalPages ? currentPage + 1 : totalPages)
            }
            disabled={currentPage === totalPages}
            className={`relative inline-flex items-center px-2 py-2 ${
              !showJumpButtons ? "rounded-r-md" : ""
            } border border-red-300 bg-white text-sm font-medium text-red-500 ${
              currentPage === totalPages
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-50"
            }`}
            aria-label="Next page"
          >
            <ChevronRight size={16} />
          </button>

          {showJumpButtons && (
            <button
              onClick={goToLastPage}
              disabled={currentPage === totalPages}
              className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-red-300 bg-white text-sm font-medium text-red-500 ${
                currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-red-50"
              }`}
              aria-label="Last page"
            >
              <ChevronsRight size={16} />
            </button>
          )}
        </nav>
      </div>

      <div className="md:hidden text-center w-full">
        <p className="text-sm text-gray-600">
          Page <span className="font-medium">{currentPage}</span> of{" "}
          <span className="font-medium">{totalPages}</span>
        </p>
      </div>

      {totalPages > 10 && (
        <div className="hidden md:flex items-center space-x-2">
          <span className="text-sm text-gray-600">Go to page:</span>
          <input
            type="number"
            min="1"
            max={totalPages}
            value={currentPage}
            onChange={(e) => {
              const page = parseInt(e.target.value);
              if (page >= 1 && page <= totalPages) {
                paginate(page);
              }
            }}
            onBlur={(e) => {
              const page = parseInt(e.target.value);
              if (page < 1) paginate(1);
              else if (page > totalPages) paginate(totalPages);
            }}
            className="w-16 px-2 py-1 border border-red-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            aria-label="Go to page"
          />
        </div>
      )}
    </div>
  );
};

export default Pagination;
