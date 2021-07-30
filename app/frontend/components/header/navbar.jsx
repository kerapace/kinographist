import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import LoginFormContainer from "./login_form_container";
import UserDropdownContainer from "./user_dropdown_container";


const Navbar = ({currentUser, toggleSignupModal}) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  return (
    <div className="nav-container">
      <nav className="header-nav">
        {
          !displayLogin ? "" : 
            <LoginFormContainer setDisplayLogin={setDisplayLogin}/>
        }
        {
          currentUser === undefined ? 
          <>
            <button onClick={() => setDisplayLogin(!displayLogin)}>Sign In</button>
            <button onClick={() => toggleSignupModal()}>Create Account</button>
          </>
           :
          <>
            <UserDropdownContainer user={currentUser}/>
            <Link to="/activity">Activity</Link>
          </>
        }
        <Link to="/films/browse">Films</Link>
        <Link to="/lists">Lists</Link>
        <Link to="/users">Members</Link>
      </nav>
    </div>
  );
}

export default Navbar;