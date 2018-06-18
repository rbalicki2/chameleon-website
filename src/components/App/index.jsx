// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import TimeOfDayToggler from './TimeOfDayToggler';
import Routes from './Routes';

type ToggleTimeOfDay = () => void;

type AppProps = {|
  toggleTimeOfDay: ToggleTimeOfDay,
  isDay: boolean,
|};

const AppContainer = styled.div`
  width: 100%;
  max-width: 970px;
  margin: 80px auto 80px;
  transition: 400ms linear all;
`;

export default ({
  toggleTimeOfDay,
  isDay,
}: AppProps) => (<Fragment>
  <TimeOfDayToggler
    isDay={isDay}
    toggleTimeOfDay={toggleTimeOfDay}
  />
  <AppContainer>
    <Routes />
  </AppContainer>
</Fragment>);
