// @flow
import { type TimeOfDay } from './TimeOfDay';

// TODO figure out a way to get rid of ActionType
export type Action = ({
  type: 'SET_TIME_OF_DAY',
  timeOfDay: TimeOfDay,
} | {
  type: 'INCREMENT_SECTION_DEPTH',
} | {
  type: 'INCREMENT_PANEL_DEPTH',
} | {
  type: 'ENTER_HEADING',
} | {
  type: 'ENTER_APP_CONTAINER',
} | {
  type: 'ENTER_JUMBOTRON',
});

export type ActionType = 'SET_TIME_OF_DAY'
  | 'INCREMENT_SECTION_DEPTH'
  | 'INCREMENT_PANEL_DEPTH'
  | 'ENTER_HEADING'
  | 'ENTER_APP_CONTAINER'
  | 'ENTER_JUMBOTRON';
