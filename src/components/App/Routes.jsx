import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import LandingPage from './LandingPage';

export default () => (<BrowserRouter>
  <Route exact path="/" component={LandingPage} />
</BrowserRouter>);
