import {Route, Link, Switch, Redirect} from "react-router-dom";
import {AuthRoute} from "./util/route_util";
import React from "react";
import Header from "./components/header";
import SignupModalContainer from "./components/signup_modal_container";
import FilmDisplayContainer from "./components/film_display_container";
import FilmBrowseContainer from "./components/film_browse_container";
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
        <Route path="/films/browse" component={FilmBrowseContainer}/>
        <Route path="/" render={() => (<Redirect to="/"/>)}/>
      </Switch>
      <Route path="/"><div className="footer">Seed data from <a href="https://themoviedb.org">tMDb</a>.</div></Route>
    </>
  );
};


export default App;