import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import configureStore from "./store/store";

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
  window.dispatch = store.dispatch;
  window.getState = store.getState;
  ReactDOM.render(<Root store={store}/>,rootElement);
});