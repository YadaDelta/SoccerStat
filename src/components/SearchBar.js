import React from "react";

const SearchBar = ({ setSearchInput, setActivePage }) => (
  <div className="searchBar">
    <input
      placeholder="Поиск"
      className="searchInput"
      onChange={(e) => {
        setActivePage(1);
        setSearchInput(e.target.value);
      }}
    />
  </div>
);

export default SearchBar;
