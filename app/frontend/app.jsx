import {Route, Link, Switch, Redirect} from "react-router-dom";
import {AuthRoute} from "./util/route_util";
import React from "react";
import Header from "./components/header";
import SignupModalContainer from "./components/signup_modal_container";
const App = (props) => {
  return (
    <>
      <Route path="/">
        <Header/>
        <SignupModalContainer/>
      </Route>
      <Switch>
        <Route exact path="/"></Route>
        <Route path="/film/:filmId"><FilmDisplayContainer/></Route>
        <Redirect to="/"/>
      </Switch>
    </>
  );
};


export default App;