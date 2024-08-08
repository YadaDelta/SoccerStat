import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../logic/api";
import { Pagination, SearchBar } from "../components";
import { cardSkeleton } from "../assets/skeletonData";

const Leagues = () => {
  const [data, setData] = useState(cardSkeleton);
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [error, setError] = useState(0);

  const errorMessage =
    "Количество использований бесплатного API превышено. Пожалуйста, подождите минуту.";

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
    api("competitions/")
      .then((res) => {
        console.log(res.data.competitions);
        setData(res.data.competitions);
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
          {pageLeagues.map((data) => (
            <Link key={data.id} to={"/leagues/" + data.id} className="cardLink">
              <div className="league">
                <img src={data.emblem} alt="#" className="leagueImage" />
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

export default Leagues;
