import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../logic/api";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Leagues = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);

  const filteredLeagues =
    searchInput !== ""
      ? data.filter((data) => data.name.includes(searchInput))
      : data;

  const totalItems = filteredLeagues.length;
  const itemsPerPage = 10;

  const pageLeagues = filteredLeagues.slice(
    activePage * itemsPerPage - itemsPerPage,
    activePage * itemsPerPage
  );

  useEffect(() => {
    api("competitions/").then((res) => {
      console.log(res.data.competitions);
      setData(res.data.competitions);
    });
  }, []);

  return (
    <>
      <SearchBar
        setSearchInput={setSearchInput}
        setActivePage={setActivePage}
      />
      <div className="leagues">
        {pageLeagues.map((data) => (
          <div key={data.id} className="league">
            <img src={data.emblem} alt="#" className="leagueImage" />
            <h1>{data.name}</h1>
            <Link to={"/leagues/" + data.id}>Link</Link>
          </div>
        ))}
      </div>
      <Pagination
        activePage={activePage}
        setActivePage={setActivePage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
      />
    </>
  );
};

export default Leagues;
