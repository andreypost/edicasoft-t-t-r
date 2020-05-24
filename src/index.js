import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter, Route } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import './normalize.css';
import './index.css';
import Main from './Main';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <Router>
    <Route exact path="/" component={Main} />
  </Router>,
  // <HashRouter basename='/'>
  //   <Route exact path="/" component={Main} />
  // </HashRouter>
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
