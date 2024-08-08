import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../logic/api";
import { Pagination, Breadcrumbs, DateFilter } from "../components";
import { tableSkeleton } from "../assets/skeletonData";

const League = () => {
  const [data, setData] = useState(tableSkeleton);
  const [activePage, setActivePage] = useState(1);
  const [leagueName, setLeagueName] = useState("");
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [error, setError] = useState(0);

  const errorMessage =
    "Количество использований бесплатного API превышено. Пожалуйста, подождите минуту.";

  const { id } = useParams();

  const filteredMatches = (data) => {
    if (dateRange.startDate === null || dateRange.endDate === null) {
      return data;
    } else {
      return data.filter((data) => {
        return (
          data.utcDate > dateRange.startDate && data.utcDate < dateRange.endDate
        );
      });
    }
  };

  const totalItems = filteredMatches(data).length;
  const itemsPerPage = 20;

  const pageMatches = filteredMatches(data).slice(
    activePage * itemsPerPage - itemsPerPage,
    activePage * itemsPerPage
  );

  useEffect(() => {
    api(`competitions/${id}/matches/`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.matches);
        setLeagueName(res.data.competition.name);
      })
      .catch((err) => {
        if (err.response.status === 429) {
          setError(err.response.status);
        }
      });
  }, [id]);

  const nameTable = {
    LOADING: "Загрузка",
    TIMED: "Объявлен",
    SCHEDULED: "Запланирован",
    LIVE: "В прямом эфире",
    IN_PLAY: "В игре",
    PAUSED: "Пауза",
    FINISHED: "Завершен",
    POSTPONED: "Отложен",
    SUSPENDED: "Приостановлен",
    CANCELED: "Отменен",
  };

  const parseMatchData = (matchData) => {
    const rawDate = new Date(matchData.utcDate);
    const matchId = matchData.id;
    const matchDate = rawDate.toLocaleDateString("ru-Ru");
    const matchTime = rawDate.toLocaleTimeString("ru-Ru", {
      hour: "numeric",
      minute: "numeric",
    });
    const matchStatus = nameTable[matchData.status];
    const matchHomeTeam = matchData.homeTeam.name;
    const matchAwayTeam = matchData.awayTeam.name;
    const matchHomeScore = matchData.score.fullTime.home;
    const matchAwayScore = matchData.score.fullTime.away;
    const matchFullScore =
      matchHomeScore !== null ? `${matchHomeScore}:${matchAwayScore}` : "";

    const parsedData = {
      matchId,
      matchDate,
      matchTime,
      matchStatus,
      matchHomeTeam,
      matchAwayTeam,
      matchFullScore,
    };
    return parsedData;
  };

  return (
    <>
      <Breadcrumbs openedElement={leagueName} />
      <h1>Матчи</h1>
      <DateFilter
        dateRange={dateRange}
        setDateRange={setDateRange}
        setActivePage={setActivePage}
      />
      {error === 429 ? (
        <div className="errorMessage">{errorMessage}</div>
      ) : (
        <table>
          <tbody>
            {pageMatches.map((match) => {
              const parsedData = parseMatchData(match);
              return (
                <tr className="leagueLine" key={parsedData.matchId}>
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

export default League;
