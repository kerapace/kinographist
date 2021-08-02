import { Link } from "react-router-dom";
import React from "react";
import NavbarContainer from "./navbar_container";

const Header = (props) => (
  <div className="header-container">
    <header className="main-header">
        <div className="background-gradient"></div>
        <div className="background-gradient present"/>
        <div className="logo-container">
          <Link to="/">
            Kinographist
            {/* <img src="logo.png"></img> */}
          </Link>
        </div>
        <NavbarContainer/>
    </header>
  </div>
);

export default Header;