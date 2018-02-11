// @flow
import React from 'react';
import AppContainer from 'src/components/Contextual/AppContainer';
import TimeOfDayToggler from './TimeOfDayToggler';
import Routes from './Routes';

type ToggleTimeOfDay = () => void;

type AppProps = {|
  toggleTimeOfDay: ToggleTimeOfDay,
  isDay: boolean,
|};

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
