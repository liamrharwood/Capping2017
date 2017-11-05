import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app.jsx';
import Home from './components/views/home.jsx';
import Community from './components/views/community.jsx';

export default (
  <Route path='/' component={App}>
  <IndexRoute component={Home} />
  <Route path='community' component={Community} />
  <Route path='*' component={Home} />
  </Route>
);