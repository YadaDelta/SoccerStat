import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/soccer-ball.svg";

const Navbar = () => {
  return (
    <div className="navbar">
      <img src={logo} alt="#" className="logo" />
      <div className="tabs">
        <NavLink to="/leagues" className="routerLink">
          <h2>Лиги</h2>
        </NavLink>
        <NavLink to="/teams" className="routerLink">
          <h2>Команды</h2>
        </NavLink>
      </div>
    </div>
  );
};

export default Navbar;
