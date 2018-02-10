// @flow
import type StyleContext from './StyleContext';
import { type Action } from './Action';

export default (oldContext: StyleContext, action: Action): StyleContext => {
  switch (action.type) {
    case 'INCREMENT_SECTION_DEPTH':
      return oldContext.incrementSectionDepth();
    case 'SET_TIME_OF_DAY':
      return oldContext.setTimeOfDay(action.timeOfDay);
    case 'INCREMENT_PANEL_DEPTH':
      return oldContext;
    default:
      (action: empty);
  }
  return oldContext;
};
