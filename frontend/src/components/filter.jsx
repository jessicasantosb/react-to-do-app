import React from "react";

const Filter = ({ filterStatus, setFilterStatus, setSort }) => {
  return (
    <div className="filter-container">
      <h3>Filtrar</h3>
      <div className="filter">
        <div>
          <p>Status</p>
          <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="All">Todas</option>
            <option value="Completed">Completas</option>
            <option value="Incompleted">Incompletas</option>
          </select>
        </div>
        <div>
          <p>Ordem Alfabética</p>
          <button className="filter-asc" onClick={() => setSort("Asc")}>Asc</button>
          <button className="filter-desc" onClick={() => setSort("Desc")}>Desc</button>
        </div>
      </div>
    </div>
  );
};

export default Filter;