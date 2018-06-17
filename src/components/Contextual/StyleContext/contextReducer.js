// @flow
import type StyleContext from './StyleContext';
import { type Action } from './Action';

export default (oldContext: StyleContext, action: Action): StyleContext => {
  switch (action.type) {
    case 'INCREMENT_SECTION_DEPTH':
      return oldContext.enterSection(action.depth);
    case 'SET_TIME_OF_DAY':
      return oldContext.setTimeOfDay(action.timeOfDay);
    case 'INCREMENT_PANEL_DEPTH':
      return oldContext.enterPanel();
    case 'ENTER_HEADER':
      return oldContext.enterHeader();
    case 'ENTER_JUMBOTRON':
      return oldContext.enterJumbotron();
    case 'ENTER_GRID':
      return oldContext.enterGrid(action);
    case 'ENTER_BUTTON':
      return oldContext.enterButton();
    case 'ENTER_BUTTON_GROUP':
      return oldContext.enterButtonGroup();
    case 'ENTER_GRID_ITEM':
      return oldContext.enterGridItem();
    default:
      (action: empty);
  }
  return oldContext;
};
