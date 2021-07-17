import React, {useState, useEffect} from "react";
import {Link, Redirect} from "react-router-dom";
import ErrorDisplay from "../errors/error_display";

const LoginForm = ({sessionErrors, setDisplayLogin, login, flushSessionErrors}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, redirectOnSubmit] = useState(false);
  const handleLogin = (e,un,pw) => {
      e.preventDefault();
      login({username: un, password: pw}).then(() => {
        setDisplayLogin(false);
        redirectOnSubmit(true);
      });
  };
  useEffect(() => {return flushSessionErrors},[])
  return (
    <>
      <form className="login-form" onSubmit={(e) => handleLogin(e,username,password)}>
        {submitted ? <Redirect to="/"/> : ""}
        <div className="exit-button">
          <a onClick={e => {
              e.preventDefault();
              setDisplayLogin(false);
            }}
          >X</a>
        </div>
        <label><p>Username:</p>
          <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
        </label>
        <label><p>Password:</p>
          <span><a onClick={(e) => handleLogin(e,"guest","123456")}>Demo Login?</a></span> 
          <input name="password" type="password" value={password} onChange={e => setPassword(e.target.value)}/>
        </label>
        <button>Sign In</button>
        <ErrorDisplay errors={sessionErrors}/>
      </form>
    </>
  );
}

export default LoginForm;