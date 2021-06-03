import React, {useState, useEffect} from "react";
import { Link, Redirect } from "react-router-dom";
import ErrorDisplay from "./error_display";

const SignupModal = ({sessionErrors,isDisplayed,signup,toggleSignupModal,flushSessionErrors}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, redirectOnSubmit] = useState(false);
  const handleSignup = (e, un, em, pw) => {
    e.preventDefault();
    signup({username: un, email: em, password: pw});
    redirectOnSubmit(true);
  };
  useEffect(() => {return flushSessionErrors},[isDisplayed]);
  return !isDisplayed ? "" : (
    <div className="modal-background">
      {!submitted ? "" : <Redirect to="/"/>}
      <section className="signup-form-container">
        <div className="exit-login-button">
          <a onClick={e => {
              e.preventDefault();
              toggleSignupModal();
            }}
          >X</a>
        </div>
        <form className="signup-form" onSubmit={(e) => handleSignup(e,username,email,password)}>
          <label><p>Username:</p>
            <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
          </label>
          <label><p>Email:</p>
            <input name="email" type="text" value={email} onChange={e => setEmail(e.target.value)}/>
          </label>
          <label><p>Password:</p>
            <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
          </label>
          <button>Sign Up</button>
        </form>
          <ErrorDisplay errors={sessionErrors}/>
      </section>
    </div>
  );
}

export default SignupModal;