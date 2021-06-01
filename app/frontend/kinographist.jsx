import React from 'react';
import ReactDOM from 'react-dom';
import Root from './root';
import configureStore from "./store/store";

document.addEventListener('DOMContentLoaded', () => {
  const rootElement = document.getElementById("root");
  window.preloadedState
  const placeholder = <h1>Hello World!</h1>;
  ReactDOM.render(placeholder,rootElement);
});