/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import PageItem from "./PageItem";
import { range } from "../../helpers/arrayHelpers";

function Pagination({
  totalRecords,
  pageLimit,
  reqPageNeighbours,
  onPageChanged,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const pageNeighbours =
    typeof reqPageNeighbours === "number"
      ? Math.max(0, Math.min(reqPageNeighbours, 2))
      : 0;
  const leftPage = "LEFT";
  const rightPage = "RIGHT";
  const totalPages = Math.ceil(totalRecords / pageLimit);
  const pages = fetchPageNumbers();

  useEffect(() => goToPage(1), []);

  const handleClick = (page) => (event) => {
    event.preventDefault();
    goToPage(page);
  };

  const goToPage = (page) => {
    const currentPage = Math.max(0, Math.min(page, totalPages));

    const paginationData = {
      currentPage,
      pageLimit,
    };

    onPageChanged(paginationData);
    setCurrentPage(currentPage);
  };

  const handleMoveLeft = (event) => {
    event.preventDefault();
    goToPage(currentPage - pageNeighbours * 2 - 1);
  };

  const handleMoveRight = (event) => {
    event.preventDefault();
    goToPage(currentPage + pageNeighbours * 2 + 1);
  };

  function fetchPageNumbers() {
    const totalNumbers = pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      const startPage = Math.max(2, currentPage - pageNeighbours);
      const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

      let pages = range(startPage, endPage);

      const hasLeftSpill = startPage > 2;
      const hasRightSpill = totalPages - endPage > 1;
      const spillOffset = totalNumbers - (pages.length + 1);

      switch (true) {
        case hasLeftSpill && !hasRightSpill: {
          const extraPages = range(startPage - spillOffset, startPage - 1);
          pages = [leftPage, ...extraPages, ...pages];
          break;
        }

        case !hasLeftSpill && hasRightSpill: {
          const extraPages = range(endPage + 1, endPage + spillOffset);
          pages = [...pages, ...extraPages, rightPage];
          break;
        }

        case hasLeftSpill && hasRightSpill:
        default: {
          pages = [leftPage, ...pages, rightPage];
          break;
        }
      }
      return [1, ...pages, totalPages];
    }
    return range(1, totalPages);
  }

  return (
    <>
      <ul className="pagination justify-content-center" id="food-pagination">
        {pages.map((page, index) => {
          if (page === leftPage)
            return (
              <PageItem
                key={index}
                pageText="&laquo;"
                handleClick={handleMoveLeft}
              />
            );

          if (page === rightPage)
            return (
              <PageItem
                key={index}
                pageText="&raquo;"
                handleClick={handleMoveRight}
              />
            );

          return (
            <PageItem
              key={index}
              pageText={page}
              active={currentPage === page}
              handleClick={handleClick(page)}
            />
          );
        })}
      </ul>
    </>
  );
}

Pagination.propTypes = {
  totalRecords: PropTypes.number.isRequired,
  pageLimit: PropTypes.number.isRequired,
  reqPageNeighbours: PropTypes.number.isRequired,
  onPageChanged: PropTypes.func.isRequired,
};

export default Pagination;
