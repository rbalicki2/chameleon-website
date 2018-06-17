// @flow
import React from 'react';

import StateProvider from 'src/components/Providers/StateProvider';
import { type TimeOfDay } from 'src/components/Contextual/StyleContext/TimeOfDay';
import Background from 'src/components/Contextual/Background';
import App from 'src/components/App';
import { UpdateContext } from './components/Contextual/StyleContext';

type TimeOfDayUpdater = (TimeOfDay) => void;

export default () => (<StateProvider initialValue="DAY">
  {
    (time: TimeOfDay, setTimeOfDay: TimeOfDayUpdater) =>
      (<UpdateContext call={context => context.setTimeOfDay(time)}>
        <Background />
        <App
          toggleTimeOfDay={
            () => setTimeOfDay(time === 'DAY' ? 'NIGHT' : 'DAY')
          }
          isDay={time === 'DAY'}
        />
      </UpdateContext>)
  }
</StateProvider>);
