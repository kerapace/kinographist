import React from "react";
import { Link } from "react-router-dom";

const UserDropdown = ({user, logout}) => (
  <div className="user-dropdown-container">
    <Link to={`/user/${user.id}`}>{user.username}</Link>
    <ul className="dropdown-options">
      <li><Link to="/">Home</Link></li>
      <li><a onClick={logout}>Sign Out</a></li>
    </ul>
  </div>
);

export default UserDropdown;