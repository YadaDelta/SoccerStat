import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Leagues from "./pages/LeaguesList";
import League from "./pages/League";
import Teams from "./pages/TeamsList";
import Team from "./pages/Team";

const Router = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/leagues" />} />
        <Route path="/leagues" element={<Leagues />} />
        <Route path="/leagues/:id" element={<League />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/teams/:id" element={<Team />} />
      </Routes>
    </>
  );
};

export default Router;
