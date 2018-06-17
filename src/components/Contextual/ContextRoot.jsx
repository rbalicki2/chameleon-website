// @flow
import React from 'react';
import StateProvider from 'src/components/Providers/StateProvider';

import { type TimeOfDay } from './StyleContext/TimeOfDay';
import Background from './Background';
import { UpdateContext } from './StyleContext';

type TimeOfDayUpdater = (TimeOfDay) => void;

export default () => (<StateProvider initialValue="DAY">
  {
    (time: TimeOfDay, setTimeOfDay: TimeOfDayUpdater) =>
      (<UpdateContext call={context => context.setTimeOfDay(time)}>
        <Background />
        { false && setTimeOfDay }
      </UpdateContext>)
  }
</StateProvider>);
