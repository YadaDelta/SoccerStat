import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = ({ openedElement }) => {
  const nameTable = {
    leagues: "Лиги",
    teams: "Команды",
  };
  const location = useLocation();
  const rootElement = location.pathname.split("/")[1];
  const localRootElement = nameTable[rootElement];

  return (
    <nav className="breadCrumbs">
      <div className="rootElement">
        <Link to={`/${rootElement}/`}>{localRootElement}</Link>
      </div>
      <div className="divider">{">"}</div>
      <div className="openedElement">{openedElement}</div>
    </nav>
  );
};

export default Breadcrumbs;
