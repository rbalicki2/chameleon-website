// @flow
import { type TimeOfDay } from './TimeOfDay';
import { type GridType, type FlexContainerProperties } from './Grid';
import { type Alignment } from './Alignment';

export type StyleContextState = {
  sectionDepth: number,
  sectionAlignment: Alignment,
  panelDepth: number,
  timeOfDay: TimeOfDay,
  inAppContainer: boolean,
  inHeader: boolean,
  inButton: boolean,
  inButtonGroup: boolean,
  textSizeMultiple: number,
  gridType: ?GridType,
  flexContainerProperties: ?FlexContainerProperties,
  inGridItem: boolean,
};
