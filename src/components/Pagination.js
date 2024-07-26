import React from "react";

const Pagination = ({
  activePage,
  itemsPerPage,
  setActivePage,
  totalItems,
}) => {
  const paginationRad = 2;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;

  const createPageNumbers = (activePage, totalPages, paginationRad) => {
    const items = [1];

    if (activePage === 1 && totalPages === 1) return items;
    if (activePage > 4) items.push("…");

    const lRad = activePage - paginationRad;
    const rRad = activePage + paginationRad;

    for (let i = lRad > 2 ? lRad : 2; i <= Math.min(totalPages, rRad); i++)
      items.push(i);

    if (rRad + 1 < totalPages) items.push("…");
    if (rRad < totalPages) items.push(totalPages);

    return items;
  };

  const pageNumbers = createPageNumbers(activePage, totalPages, paginationRad);

  return (
    <div className="pagination">
      {pageNumbers.map((pageNumber, index) => (
        <button
          key={index}
          onClick={() => setActivePage(pageNumber)}
          disabled={pageNumber === "…"}
          className={
            pageNumber === activePage
              ? "activePageNumber"
              : "inactivePageNumber"
          }
        >
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
