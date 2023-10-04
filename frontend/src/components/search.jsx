import React from "react";

const Search = ({ search, setSearch }) => {
  return (
    <div>
      <input
        className="search-input"
        value={search}
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Pesquise aqui"
      />
    </div>
  );
};

export default Search;
