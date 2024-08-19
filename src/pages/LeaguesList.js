import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, SearchBar, ErrorModule } from "../components";
import { useGetLeagues } from "../logic/query";
import { filterMatchesBySearch } from "../logic/pageUtils";

const Leagues = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);

  const { data, error } = useGetLeagues();

  const filteredLeagues = filterMatchesBySearch(data, searchInput);

  const totalItems = filteredLeagues.length;
  const itemsPerPage = 10;

  const pageLeagues = filteredLeagues.slice(
    activePage * itemsPerPage - itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <>
      {error !== null ? (
        <ErrorModule error={error} />
      ) : (
        <>
          <SearchBar
            setSearchInput={setSearchInput}
            setActivePage={setActivePage}
          />
          <div className="leagues">
            {pageLeagues.map((data) => (
              <div className="card">
                <div className="innerCard">
                  <Link
                    key={data.id}
                    to={"/leagues/" + data.id}
                    className="cardLink"
                  >
                    <div className="league">
                      <img src={data.emblem} alt="#" className="leagueImage" />
                      <h1>{data.name}</h1>
                    </div>
                  </Link>
                </div>
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
      )}
    </>
  );
};

export default Leagues;
