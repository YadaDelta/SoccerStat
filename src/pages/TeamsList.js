import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../logic/api";
import { Pagination, SearchBar } from "../components";
import { cardSkeleton } from "../assets/skeletonData";

const Teams = () => {
  const [data, setData] = useState(cardSkeleton);
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [error, setError] = useState(0);

  const errorMessage =
    "Количество использований бесплатного API превышено. Пожалуйста, подождите минуту.";

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
    api("teams/")
      .then((res) => {
        console.log(res.data.teams);
        setData(res.data.teams);
      })
      .catch((err) => {
        if (err.response.status === 429) {
          setError(err.response.status);
        }
      });
  }, []);

  return (
    <>
      <SearchBar
        setSearchInput={setSearchInput}
        setActivePage={setActivePage}
      />
      {error === 429 ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <div className="leagues">
          {pageTeams.map((data) => (
            <Link key={data.id} to={"/teams/" + data.id} className="cardLink">
              <div className="league">
                <img src={data.crest} alt="#" className="leagueImage" />
                <h1>{data.name}</h1>
              </div>
            </Link>
          ))}
        </div>
      )}
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
