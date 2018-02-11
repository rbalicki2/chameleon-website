// @flow
import React from 'react';
import TimeOfDayToggler from './TimeOfDayToggler';

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
</div>);
