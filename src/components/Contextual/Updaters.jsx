// @flow
import { updateContextGenerator } from './StyleContext';

export const SetTimeOfDay = updateContextGenerator({ type: 'SET_TIME_OF_DAY' });
export const EnterSection = updateContextGenerator({ type: 'INCREMENT_SECTION_DEPTH' });
export const EnterJumbotron = updateContextGenerator({ type: 'ENTER_JUMBOTRON' });
export const EnterPanel = updateContextGenerator({ type: 'INCREMENT_PANEL_DEPTH' });
export const EnterHeader = updateContextGenerator({ type: 'ENTER_HEADER' });
export const EnterButton = updateContextGenerator({ type: 'ENTER_BUTTON' });
export const EnterButtonGroup = updateContextGenerator({ type: 'ENTER_BUTTON_GROUP' });
export const EnterGrid = updateContextGenerator({ type: 'ENTER_GRID' });
export const EnterAppContainer = updateContextGenerator({ type: 'ENTER_APP_CONTAINER' });
