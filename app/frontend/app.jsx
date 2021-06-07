import {Route, Link, Switch, Redirect} from "react-router-dom";
import {AuthRoute} from "./util/route_util";
import React from "react";
import Header from "./components/header";
import SignupModalContainer from "./components/signup_modal_container";
import FilmDisplayContainer from "./components/film_display_container";
const App = (props) => {
  return (
    <>
      <Route path="/">
        <Header/>
        <SignupModalContainer/>
      </Route>
      <Switch>
        {/* <Route exact path="/"/> */}
        <Route path="/film/:filmId" component={FilmDisplayContainer}/>
        {/* <Redirect to="/"/> */}
      </Switch>
    </>
  );
};


export default App;