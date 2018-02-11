// @flow
import { type TimeOfDay } from './TimeOfDay';

export type Action = ({
  type: 'SET_TIME_OF_DAY',
  timeOfDay: TimeOfDay,
} | {
  type: 'INCREMENT_SECTION_DEPTH',
} | {
  type: 'INCREMENT_PANEL_DEPTH',
} | {
  type: 'ENTER_HEADING',
});

export type ActionType = 'SET_TIME_OF_DAY'
  | 'INCREMENT_SECTION_DEPTH'
  | 'INCREMENT_PANEL_DEPTH'
  | 'ENTER_HEADING';
