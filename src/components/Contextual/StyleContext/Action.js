// @flow
import { type TimeOfDay } from './TimeOfDay';

export type Action = ({
  type: 'SET_TIME_OF_DAY',
  timeOfDay: TimeOfDay,
} | {
  type: 'INCREMENT_SECTION_DEPTH',
} | {
  type: 'INCREMENT_PANEL_DEPTH',
});
