// @flow
import React from 'react';
import StateProvider from 'src/components/Providers/StateProvider';

import { SetTimeOfDay } from './Updaters';
import { type TimeOfDay } from './StyleContext/TimeOfDay';
import Background from './Background';

type TimeOfDayUpdater = (TimeOfDay) => void;

export default () => (<StateProvider initialValue="DAY">
  {
    (time: TimeOfDay, setTimeOfDay: TimeOfDayUpdater) =>
      (<SetTimeOfDay timeOfDay={time}>
        <Background />
        { false && setTimeOfDay }
      </SetTimeOfDay>)
  }
</StateProvider>);
