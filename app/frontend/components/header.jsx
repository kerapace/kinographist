import { Link } from "react-router-dom";
import React from "react";
import NavbarContainer from "./navbar_container";

const Header = (props) => (
  <header className="main-header">
    <div className="background-gradient"></div>
    <div className="logo-container">
      <Link to="/">
        Placeholder
        {/* <img src="logo.png"></img> */}
      </Link>
    </div>
    <NavbarContainer/>
  </header>
);

export default Header;