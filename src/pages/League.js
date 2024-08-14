import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination, Breadcrumbs, DateFilter } from "../components";
import { ErrorModule } from "../components";
import { useGetLeagueMatches } from "../logic/query";
import { parseMatchData } from "../logic/pageUtils";
import { filterMatchesByDate, findCompetition } from "../logic/pageUtils";

const League = () => {
  const [activePage, setActivePage] = useState(1);
  const [leagueName, setLeagueName] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams();
  const { data, error } = useGetLeagueMatches(id);

  useEffect(() => {
    setLeagueName(findCompetition(data[0]));
  }, [data]);

  const filteredMatches = filterMatchesByDate(data, dateRange);

  const totalItems = filteredMatches.length;
  const itemsPerPage = 20;

  const pageMatches = filteredMatches.slice(
    activePage * itemsPerPage - itemsPerPage,
    activePage * itemsPerPage
  );

  return (
    <>
      {error !== null ? (
        <ErrorModule error={error} />
      ) : (
        <>
          <Breadcrumbs openedElement={leagueName} />
          <h1>Матчи</h1>
          <DateFilter
            dateRange={dateRange}
            setDateRange={setDateRange}
            setActivePage={setActivePage}
          />
          <table>
            <tbody>
              {pageMatches.map((match) => {
                const parsedData = parseMatchData(match);
                return (
                  <tr className="tableLine" key={parsedData.matchId}>
                    <td className="date">{parsedData.matchDate}</td>
                    <td className="time">{parsedData.matchTime}</td>
                    <td className="status">{parsedData.matchStatus}</td>
                    <td className="homeTeam">{parsedData.matchHomeTeam}</td>
                    <td className="awayTeam">{parsedData.matchAwayTeam}</td>
                    <td className="score">{parsedData.matchFullScore}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default League;
