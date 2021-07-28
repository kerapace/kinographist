import {Route, Link, Switch, Redirect} from "react-router-dom";
import {AuthRoute} from "./util/route_util";
import React, { useEffect } from "react";
import Header from "./components/header/header";
import SignupModalContainer from "./components/homepage/signup_modal_container";
import FilmDisplayContainer from "./components/film_page/film_display_container";
import FilmBrowseContainer from "./components/browse/film_browse_container";
import HomeSplashContainer from "./components/homepage/home_splash_container";
import UserProfileContainer from "./components/profile/user_profile_container";
import WatchListDisplayContainer from "./components/lists/watch_list_display_container";
import CreateListModalContainer from "./components/homepage/create_list_modal_container";

const App = (props) => {
  useEffect(() => {
    document.body.style.overflow = 'unset';
    document.body.style.height = 'auto';
},[]);
  return (
    <>
      <Route path="/">
        <Header/>
        <CreateListModalContainer/>
        <SignupModalContainer/>
      </Route>
      <Switch>
        <Route exact path="/" render={() => <HomeSplashContainer tmdbId={378064}/>}/>
        <Route path="/film/:filmId" component={FilmDisplayContainer}/>
        <Route path="/films/browse" component={FilmBrowseContainer}/>
        <Route exact path="/user/:userId" component={UserProfileContainer}/>
        <Route path ="/user/:userId/watchlist" component={WatchListDisplayContainer}/>
        <Route path="/" render={() => (<Redirect to="/"/>)}/>
      </Switch>
      <Route path="/"><div className="footer">Seed data from <a href="https://themoviedb.org">tMDb</a>.</div></Route>
    </>
  );
};


export default App;