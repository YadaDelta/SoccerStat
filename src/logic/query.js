import { useQuery } from "react-query";
import api from "./api";
import { cardSkeleton, tableSkeleton } from "../assets/skeletonData";

const getData = async ({ queryKey }) => {
  const [key, id, secondKey] = queryKey;
  if (!secondKey) {
    const { data } = await api(key);
    return data[key];
  }
  const { data } = await api(`${secondKey}/${id}/matches`);
  return data.matches;
};

const useGetLeagues = () => {
  return useQuery({
    queryKey: ["competitions"],
    queryFn: getData,
    initialData: cardSkeleton,
  });
};

const useGetLeagueMatches = (id) => {
  return useQuery({
    queryKey: ["leagueMatches", id, "competitions"],
    queryFn: getData,
    initialData: tableSkeleton,
  });
};

const useGetTeams = () => {
  return useQuery({
    queryKey: ["teams"],
    queryFn: getData,
    initialData: cardSkeleton,
  });
};

const useGetTeamMatches = (id) => {
  return useQuery({
    queryKey: ["teamMatches", id, "teams"],
    queryFn: getData,
    initialData: tableSkeleton,
  });
};

export { useGetLeagues, useGetLeagueMatches, useGetTeams, useGetTeamMatches };
