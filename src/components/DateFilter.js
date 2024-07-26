import React from "react";

const DateFilter = ({ dateRange, setDateRange, setActivePage }) => (
  <div className="searchBar">
    {" с "}
    <input
      type="date"
      className="dateInput"
      onChange={(e) => {
        setActivePage(1);
        setDateRange({ ...dateRange, startDate: e.target.value });
      }}
    />
    {" по "}
    <input
      type="date"
      className="dateInput"
      onChange={(e) => {
        setActivePage(1);
        setDateRange({ ...dateRange, endDate: e.target.value });
      }}
    />
  </div>
);

export default DateFilter;
