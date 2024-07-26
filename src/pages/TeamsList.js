import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../logic/api";
import Pagination from "../components/Pagination";
import SearchBar from "../components/SearchBar";

const Teams = () => {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);

  const filteredTeams =
    searchInput !== ""
      ? data.filter((data) => data.name.includes(searchInput))
      : data;

  const totalItems = filteredTeams.length;
  const itemsPerPage = 10;

  const pageTeams = filteredTeams.slice(
    activePage * itemsPerPage - itemsPerPage,
    activePage * itemsPerPage
  );

  useEffect(() => {
    api("teams/").then((res) => {
      console.log(res.data.teams);
      setData(res.data.teams);
    });
  }, []);

  return (
    <>
      <SearchBar
        setSearchInput={setSearchInput}
        setActivePage={setActivePage}
      />
      <div className="leagues">
        {pageTeams.map((data) => (
          <div key={data.id} className="league">
            <img src={data.crest} alt="#" className="leagueImage" />
            <h1>{data.name}</h1>
            <Link to={"/teams/" + data.id}>Link</Link>
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

export default Teams;
