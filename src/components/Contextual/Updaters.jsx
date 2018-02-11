// @flow
import { updateContextGenerator } from './StyleContext';

export const SetTimeOfDay = updateContextGenerator({ type: 'SET_TIME_OF_DAY' });
export const EnterSection = updateContextGenerator({ type: 'INCREMENT_SECTION_DEPTH' });
export const EnterJumbotron = updateContextGenerator({ type: 'ENTER_JUMBOTRON' });
export const EnterPanel = updateContextGenerator({ type: 'INCREMENT_PANEL_DEPTH' });
export const EnterHeader = updateContextGenerator({ type: 'ENTER_HEADING' });
export const EnterAppContainer = updateContextGenerator({ type: 'ENTER_APP_CONTAINER' });
