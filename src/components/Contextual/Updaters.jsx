// @flow
import { updateContextGenerator } from './StyleContext';

export const SetTimeOfDay = updateContextGenerator({ type: 'SET_TIME_OF_DAY' });
export const IncreaseSectionLevel = updateContextGenerator({ type: 'INCREMENT_SECTION_DEPTH' });
export const IncreasePanelLevel = updateContextGenerator({ type: 'INCREMENT_PANEL_DEPTH' });
export const EnterHeading = updateContextGenerator({ type: 'ENTER_HEADING' });
export const EnterAppContainer = updateContextGenerator({ type: 'ENTER_APP_CONTAINER' });
