// @flow
import StyleContext from './StyleContext';
import { BASE_FONT_ROOT } from './Sizes';

export default new StyleContext({
  sectionDepth: 0,
  sectionAlignment: 'left',
  panelDepth: 0,
  timeOfDay: 'DAY',
  inHeader: false,
  inButton: false,
  inButtonGroup: false,
  fontSizeRoot: BASE_FONT_ROOT,
  gridType: undefined,
  inGridItem: false,
  flexContainerProperties: undefined,
  rotation: 0,
});
