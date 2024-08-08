import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components";
import { Leagues, League, Teams, Team } from "./pages";

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
        <Route path="*" element={<Navigate to="/leagues" />} />
      </Routes>
    </>
  );
};

export default Router;
