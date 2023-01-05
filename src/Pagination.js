import { useState } from "react";
import "./App.css";

const Pagination = ({ data, query, pageLimit, dataLimit, showData }) => {
  const [pages] = useState(Math.round(data.length / dataLimit));
  const [currentPage, setCurrentPage] = useState(1);

  function nextPage() {
    setCurrentPage((page) => page + 1);
  }

  function prevPage() {
    setCurrentPage((page) => page - 1);
  }
 
  function onChangePage(e) {
    const pageNumber = Number(e.target.textContent);
    setCurrentPage(pageNumber);
  }

  const paginationData = () => {
    const start = currentPage * dataLimit - dataLimit;
    const end = start + dataLimit;
    return data.slice(start, end);
  };

  const paginationGroup = () => {
    let start = Math.floor((currentPage - 1) / pageLimit) * pageLimit;
    return new Array(pageLimit).fill().map((_, index) => start + index + 1);
  };

  return (
    <div className="container">
      {paginationData()
        .filter((poke) => {
          if (query === "") {
            return poke;
          } else if (poke.name.toLowerCase().includes(query.toLowerCase())) {
            return poke;
          }
        })
        .map(({ name, url }, index) => (
          <b className="pokemon" key={index} onClick={() => showData(url)}>
            {name}
          </b>
        ))}
      <div className="pagination">
        <button
          onClick={prevPage}
          className={`prev ${currentPage === 1 ? "disabled" : ""}`}
        >
          <strong>Prev</strong>
        </button>

        {paginationGroup().map((item, index) => (
          <button
            key={index}
            onClick={onChangePage}
            className={`paginationItem ${
              currentPage === item ? "active" : null
            }`}
          >
            {item}
          </button>
        ))}

        <button
          onClick={nextPage}
          className={`next ${currentPage === pages ? "disabled" : ""}`}
        >
          <strong>Next</strong>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
