// @flow
import { updateContextGenerator } from './StyleContext';

export const SetTimeOfDay = updateContextGenerator({ type: 'SET_TIME_OF_DAY' });
export const IncreaseSectionLevel = updateContextGenerator({ type: 'INCREMENT_SECTION_LEVEL' });
export const IncreasePanelLevel = updateContextGenerator({ type: 'INCREMENT_PANEL_LEVEL' });
