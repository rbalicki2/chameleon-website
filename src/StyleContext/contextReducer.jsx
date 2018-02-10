// @flow
import { type ActionType } from './ActionType';
import type StyleContext from './StyleContext';

type HasType = {
  type: ActionType,
};

export default (oldContext: StyleContext, action: HasType): StyleContext => {
  switch (action.type) {
    case 'INCREMENT_SECTION_DEPTH':
      return oldContext.incrementSectionDepth();
    case 'SET_MODE2':
      console.log('set mode 2');
  }
  return oldContext;
}
