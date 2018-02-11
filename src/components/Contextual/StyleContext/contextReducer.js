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
      return oldContext.incrementPanelDepth();
    case 'ENTER_HEADING':
      return oldContext.enterHeader();
    case 'ENTER_APP_CONTAINER':
      return oldContext.enterAppContainer();
    default:
      (action: empty);
  }
  return oldContext;
};
