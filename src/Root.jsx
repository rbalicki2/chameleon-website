// @flow
import React from 'react';

import StateProvider from 'src/components/Providers/StateProvider';
import { SetTimeOfDay } from 'src/components/Contextual/Updaters';
import { type TimeOfDay } from 'src/components/Contextual/StyleContext/TimeOfDay';
import Background from 'src/components/Contextual/Background';
import App from 'src/components/App';

type TimeOfDayUpdater = (TimeOfDay) => void;

export default () => (<StateProvider initialValue="DAY">
  {
    (time: TimeOfDay, setTimeOfDay: TimeOfDayUpdater) =>
      (<SetTimeOfDay timeOfDay={time}>
        <Background />
        <App
          toggleTimeOfDay={
            () => setTimeOfDay(time === 'DAY' ? 'NIGHT' : 'DAY')
          }
        />
      </SetTimeOfDay>)
  }
</StateProvider>);
