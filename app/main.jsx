'use strict';

import React from 'react';
import {Router, Route, IndexRoute, useRouterHistory} from 'react-router';
import ReactDOM from 'react-dom';
import { createHashHistory } from 'history';
const appHistory = useRouterHistory(createHashHistory)({ queryKey: false });


import Main from './views/Main';
import Home from './views/Home';
import InputPage from './views/InputPage';
import ShowNumPage from './views/ShowNumPage';
import AttentionPage from './views/AttentionPage';

var routes = (
  <Router history={appHistory}>
      <Route component={Main} name="main" path="/" >
          <IndexRoute component={Home}/>
          <Route component={InputPage} path='input_page' name="input_page"/>
          <Route component={ShowNumPage} path='show_page' name="show_page" />
          <Route component={AttentionPage} path='attention_page' name="attention_page" />
      </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app-root'));
