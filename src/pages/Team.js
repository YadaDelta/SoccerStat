import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pagination, Breadcrumbs, DateFilter } from "../components";
import { ErrorComponent } from "../components";
import { useGetTeamMatches } from "../logic/query";
import { parseMatchData, paginateItems } from "../logic/pageUtils";
import { filterMatchesByDate, findTeam } from "../logic/pageUtils";

const Team = () => {
  const [activePage, setActivePage] = useState(1);
  const [teamName, setTeamName] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });

  const { id } = useParams();
  const { data, error } = useGetTeamMatches(id);

  useEffect(() => {
    setTeamName(findTeam(data));
  }, [data]);

  const filteredMatches = filterMatchesByDate(data, dateRange);

  const pageMatches = paginateItems(filteredMatches, activePage, 20);

  return (
    <>
      {error ? (
        <ErrorComponent error={error} />
      ) : (
        <>
          <Breadcrumbs openedElement={teamName} />
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
            totalItems={filteredMatches.length}
            itemsPerPage={20}
          />
        </>
      )}
    </>
  );
};

export default Team;
