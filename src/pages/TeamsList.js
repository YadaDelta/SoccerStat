import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pagination, SearchBar, ErrorModule } from "../components";
import { useGetTeams } from "../logic/query";
import { filterMatchesBySearch } from "../logic/pageUtils";

const Teams = () => {
  const [searchInput, setSearchInput] = useState("");
  const [activePage, setActivePage] = useState(1);

  const { data, error } = useGetTeams();

  const filteredTeams = filterMatchesBySearch(data, searchInput);

  const totalItems = filteredTeams.length;
  const itemsPerPage = 10;

  const pageTeams = filteredTeams.slice(
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
            {pageTeams.map((data) => (
              <div className="card">
                <div className="innerCard">
                  <Link
                    key={data.id}
                    to={"/teams/" + data.id}
                    className="cardLink"
                  >
                    <div className="league">
                      <img src={data.crest} alt="#" className="leagueImage" />
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

export default Teams;
