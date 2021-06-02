import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import LoginFormContainer from "./login_form_container";


const Navbar = ({currentUser, toggleSignupModal}) => {
  const [displayLogin, setDisplayLogin] = useState(false);
  return (
    <nav className="header-nav">
      {
        !displayLogin ? "" : 
          <LoginFormContainer/>
      }
      <button onClick={() => setDisplayLogin(!displayLogin)}>Sign In</button>
      <button onClick={() => toggleSignupModal()}>Create Account</button>
      <Link to="/films">Films</Link>
      <Link to="/lists">Lists</Link>
      <Link to="/members">Members</Link>
    </nav>
  );
}

export default Navbar;