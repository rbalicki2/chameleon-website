// @flow
import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';

import StateProvider from 'src/components/Providers/StateProvider';
import { type TimeOfDay } from 'src/components/Contextual/StyleContext/TimeOfDay';
import Background from 'src/components/Contextual/Background';
import App from 'src/components/App';
import { UpdateContext } from './components/Contextual/StyleContext';

import appleTouchIcon from './components/App/Head/apple-touch-icon.png';
import favicon32 from './components/App/Head/favicon-32x32.png';
import favicon16 from './components/App/Head/favicon-16x16.png';
// N.B. this is apparently a bug. import/extensions doesn't understand query params...
/* eslint-disable import/extensions */
// $FlowFixMe - TODO figure out how to make flow recognize these
import safariPinnedTab from './components/App/Head/safari-pinned-tab.svg?external';
/* eslint-enable import/extensions */
// $FlowFixMe
import favicon from './components/App/Head/favicon.ico';

type TimeOfDayUpdater = (TimeOfDay) => void;
export default () => (<Fragment>
  <Helmet>
    <link rel="apple-touch-icon" sizes="180x180" href={appleTouchIcon} />
    <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
    <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
    <meta name="msapplication-TileColor" content="#da532c" />
    <link rel="shortcut icon" href={favicon} />
    <meta name="theme-color" content="#ffffff" />
    <link rel="mask-icon" href={safariPinnedTab} color="#5bbad5" />
  </Helmet>
  <StateProvider initialValue="DAY">
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
  </StateProvider>
</Fragment>);
