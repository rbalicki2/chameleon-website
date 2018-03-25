// @flow
import { type TimeOfDay } from './TimeOfDay';
import { type FlexContainerProperties } from './Grid';

// TODO figure out a way to get rid of ActionType
export type Action = {|
  type: 'SET_TIME_OF_DAY',
  timeOfDay: TimeOfDay,
|} | {|
  type: 'INCREMENT_SECTION_DEPTH',
  depth: number,
|} | {|
  type: 'INCREMENT_PANEL_DEPTH',
|} | {|
  type: 'ENTER_HEADER',
|} | {|
  type: 'ENTER_APP_CONTAINER',
|} | {|
  type: 'ENTER_JUMBOTRON',
|} | GridAction | {|
  type: 'ENTER_BUTTON',
|} | {|
  type: 'ENTER_BUTTON_GROUP'
|} | {|
  type: 'ENTER_GRID_ITEM',
|};

export type GridAction = {|
  type: 'ENTER_GRID',
  gridType: 'FLEXBOX',
  flexContainerProperties: FlexContainerProperties,
|};

export type ActionType = 'SET_TIME_OF_DAY'
  | 'INCREMENT_SECTION_DEPTH'
  | 'INCREMENT_PANEL_DEPTH'
  | 'ENTER_HEADER'
  | 'ENTER_APP_CONTAINER'
  | 'ENTER_JUMBOTRON'
  | 'ENTER_GRID'
  | 'ENTER_BUTTON'
  | 'ENTER_BUTTON_GROUP'
  | 'ENTER_GRID_ITEM';
