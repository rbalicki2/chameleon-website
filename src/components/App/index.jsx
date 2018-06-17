// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import TimeOfDayToggler from './TimeOfDayToggler';
import Routes from './Routes';

import appleTouchIcon from './Head/apple-touch-icon.png';
import favicon32 from './Head/favicon-32x32.png';
import favicon16 from './Head/favicon-16x16.png';
// N.B. this is apparently a bug. import/extensions doesn't understand query params...
/* eslint-disable import/extensions */
// $FlowFixMe - TODO figure out how to make flow recognize these
import safariPinnedTab from './Head/safari-pinned-tab.svg?external';
/* eslint-enable import/extensions */
// $FlowFixMe
import favicon from './Head/favicon.ico';

type ToggleTimeOfDay = () => void;

type AppProps = {|
  toggleTimeOfDay: ToggleTimeOfDay,
  isDay: boolean,
|};

const AppContainer = styled.div`
  width: 100%;
  max-width: 970px;
  margin: 80px auto 80px;
`;

export default ({
  toggleTimeOfDay,
  isDay,
}: AppProps) => (<Fragment>
  <Helmet>
    <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
    <meta name="msapplication-TileColor" content="#da532c" />
    <link rel="shortcut icon" href={favicon} />
    <meta name="theme-color" content="#ffffff" />
    <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
  </Helmet>
  <TimeOfDayToggler
    isDay={isDay}
    toggleTimeOfDay={toggleTimeOfDay}
  />
  <AppContainer>
    <Routes />
  </AppContainer>
</Fragment>);
