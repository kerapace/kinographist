import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import configureStore from "./store/store";
import {login, signup, logout} from "./actions/session_actions";
import {fetchFilm, updateFilm} from "./util/film_api_util";
import {getFilm} from "./actions/film_actions";

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  let preloadedState = {};
  if (window.currentUser) {
    preloadedState = {
      entities: {
        users: {
          [window.currentUser.id]: window.currentUser,
        },
      },
      session: {
        currentUserId: window.currentUser.id,
      },
    };
  }
  const store = configureStore(preloadedState);
  // window.signup = signup;
  // window.login = login;
  // window.logout = logout;
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  window.fetchFilm = fetchFilm;
  window.updateFilm = updateFilm;
  window.getFilm = getFilm;
  ReactDOM.render(<Root store={store}/>,rootElement);
});