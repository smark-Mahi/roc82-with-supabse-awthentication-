const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevousPageChange,
}) => {
  const pages = getVisiblePages(currentPage, totalPages);
  function previousPageHandler() {
    onPageChange(currentPage - 1);
    onPrevousPageChange(currentPage - 2);
  }
  function nextPageHandler() {
    onPageChange(currentPage + 1);
    onPrevousPageChange(currentPage);
  }
  function pageChangeHandler(page) {
    onPageChange(page);
    onPrevousPageChange(page - 1);
  }
  return (
    <div className="flex gap-2 text-sm mt-10">
      <div onClick={previousPageHandler}>
        <button
          className="text-[#ACACAC]"
          aria-label="Previous page"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        <button
          className="text-[#ACACAC]"
          aria-label="Previous page"
          disabled={currentPage === 1}
        >
          &lt;
        </button>
      </div>
      <button
        className="text-[#ACACAC]"
        aria-label="Previous page"
        disabled={currentPage === 1}
        onClick={previousPageHandler}
      >
        &lt;
      </button>
      <ul className="flex items-center gap-2 text-sm">
        {pages.map((page, i) => (
          <li
            key={i}
            className={`text-[#ACACAC] ${
              currentPage === page && "text-black/90"
            }`}
          >
            <PageButton
              page={page}
              currentPage={currentPage}
              onClick={() => pageChangeHandler(page)}
            />
          </li>
        ))}
      </ul>
      <button
        className="text-[#ACACAC]"
        arial-label="Next page"
        disabled={currentPage === totalPages}
        onClick={nextPageHandler}
      >
        &gt;
      </button>
      <div onClick={nextPageHandler}>
        <button
          className="text-[#ACACAC]"
          arial-label="Next page"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
        <button
          className="text-[#ACACAC]"
          arial-label="Next page"
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

function PageButton({ page, currentPage, onClick }) {
  if (page === currentPage) {
    return (
      <button aria-label={`Page ${page}`} aria-current="page">
        {page}
      </button>
    );
  }
  if (page === "<" || page === ">") {
    return <span>&hellip;</span>;
  }
  return (
    <button aria-label={`Go to page ${page}`} onClick={onClick}>
      {page}
    </button>
  );
}

/**
 * Calculates a list of at most 7 pages to display.
 * Always includes the current, previous, next, first
 * and last ones if available.
 *
 * @returns an array with the page numbers to display.
 * It can include the special `'<'` and `'>'` elements
 * to represent skipped pages.
 *
 * @example
 * getVisiblePages(4, 5) // => [1, 2, 3, 4, 5]
 * getVisiblePages(4, 8) // => [1, 2, 3, 4, 5, '>', 8]
 * getVisiblePages(5, 8) // => [1, '<', 4, 5, 6, 7, 8]
 * getVisiblePages(5, 10) // => [1, '<', 4, 5, 6, '>', 10]
 */
function getVisiblePages(current, total) {
  if (total <= 7) {
    return range(total);
  }
  if (current < 5) {
    return [...range(5), ">", total];
  }
  if (current > total - 4) {
    return [1, "<", ...range(5, total - 4)];
  }
  return [1, "<", current - 1, current, current + 1, ">", total];
}

function range(count, start = 1) {
  return Array.from(new Array(count), (x, i) => i + start);
}

export default Pagination;
