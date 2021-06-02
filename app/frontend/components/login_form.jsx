import React, {useState} from "react";

const LoginForm = ({login}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      login({username: username, password: password});
      }}>
      <label htmlFor="username">Username:</label>
      <input name="username" type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      <label htmlFor="password">Password:</label>
      <input name="password" type="text" value={password} onChange={e => setPassword(e.target.value)}/>
      <input type="submit" value="Log In"/>
    </form>
  );
}

export default LoginForm;