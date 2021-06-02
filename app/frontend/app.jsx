import {Route, Link} from "react-router-dom";
import AuthRoute from "./util/route_util";
import React from "react";
import Header from "./components/header";
const App = (props) => {
  return (
    <main>
      <Route path="/">
        <Header/>
      </Route>
    </main>
  );
};


export default App;