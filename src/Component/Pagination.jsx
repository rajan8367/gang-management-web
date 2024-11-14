import React, { useState } from "react";

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];
    const maxButtons = 5; // Number of buttons to display (excluding first and last)
    const half = Math.floor(maxButtons / 2);

    // Calculate start and end pages
    let startPage = Math.max(2, currentPage - half);
    let endPage = Math.min(totalPages - 1, currentPage + half);

    // Adjust if there are not enough pages to display
    if (currentPage - half < 2) {
      endPage = Math.min(totalPages - 1, endPage + (half - (currentPage - 2)));
    }

    if (currentPage + half > totalPages - 1) {
      startPage = Math.max(
        2,
        startPage - (currentPage + half - totalPages + 1)
      );
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="d-flex mt-4 align-items-center">
      {/* Previous Button */}
      <button
        className={`btn btn-sm ${
          currentPage === 1 ? "btn-secondary" : "btn-primary"
        } me-1`}
        disabled={currentPage === 1}
        onClick={prevPage}
      >
        Previous
      </button>

      {/* Page 1 Button */}
      <button
        className={`btn btn-sm ${
          currentPage === 1 ? "btn-primary" : "btn-outline-primary"
        } me-1`}
        onClick={() => setCurrentPage(1)}
      >
        1
      </button>

      {/* Middle Page Numbers */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={`btn btn-sm ${
            number === currentPage ? "btn-primary" : "btn-outline-primary"
          } me-1`}
          onClick={() => setCurrentPage(number)}
        >
          {number}
        </button>
      ))}

      {/* Last Page Button */}
      {totalPages > 1 && (
        <button
          className={`btn btn-sm ${
            currentPage === totalPages ? "btn-primary" : "btn-outline-primary"
          } me-1`}
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      )}

      {/* Next Button */}
      <button
        className={`btn btn-sm ${
          currentPage === totalPages ? "btn-secondary" : "btn-primary"
        }`}
        disabled={currentPage === totalPages}
        onClick={nextPage}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
