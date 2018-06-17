// @flow
import React from 'react';
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
  margin: 80px auto 0;
`;

export default ({
  toggleTimeOfDay,
  isDay,
}: AppProps) => (<div>
  <TimeOfDayToggler
    isDay={isDay}
    toggleTimeOfDay={toggleTimeOfDay}
  />
  <AppContainer>
    <Routes />
  </AppContainer>
</div>);
