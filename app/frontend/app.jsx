import {Route, Link, Switch, Redirect} from "react-router-dom";
import {AuthRoute} from "./util/route_util";
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
      <Switch>
        <Route exact path="/"></Route>
        <Route><Redirect to="/"/></Route>
      </Switch>
    </main>
  );
};


export default App;