import {connect} from "react-redux";
import React from "react";
import {withRouter, Redirect, Route} from "react-router-dom";

const Auth = ({component: Component, path, loggedIn, exact}) => (
  <Route 
    path={path}
    exact={exact}
    render={ props =>
      !loggedIn ? <Component {...props}/> : <Redirect to="/"/>
      }
    />
);

const mapStateToProps = ({session}) => ({
  loggedIn: Boolean(session.currentUserId),
});

export default withRouter(connect(mapStateToProps,null)(Auth));