const findCompetition = (data) => {
  if (data === undefined) return "Пустая лига";
  return data.competition !== undefined ? data.competition.name : "Загрузка";
};

const findTeam = (data) => {
  const teams = [];
  teams.push(data[0].homeTeam.name);
  teams.push(data[0].awayTeam.name);
  return teams.includes(data[1].homeTeam.name)
    ? data[1].homeTeam.name
    : data[1].awayTeam.name;
};

const filterMatchesByDate = (data, dateRange) => {
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

const filterMatchesBySearch = (data, searchInput) => {
  return searchInput !== ""
    ? data.filter((data) =>
        data.name.toLowerCase().includes(searchInput.toLowerCase())
      )
    : data;
};

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

export {
  findCompetition,
  findTeam,
  filterMatchesByDate,
  filterMatchesBySearch,
  parseMatchData,
};
