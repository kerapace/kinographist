import {Route, Link} from "react-router-dom";
import AuthRoute from "./util/route_util";
import React from "react";
import Header from "./components/header";
import SignupModalContainer from "./components/signup_modal_container";
const App = (props) => {
  return (
    <main>
      <Route path="/">
        <Header/>
        <SignupModalContainer/>
      </Route>
    </main>
  );
};


export default App;