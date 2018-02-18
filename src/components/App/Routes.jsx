import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { Route } from 'react-router';

import LandingPage from './LandingPage';
import Documentation from './Documentation';

export default () => (<BrowserRouter>
  <div>
    <Route exact path="/" component={LandingPage} />
    <Route path="/docs" component={Documentation} />
  </div>
</BrowserRouter>);
