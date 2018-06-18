// @flow
import { type TimeOfDay } from './TimeOfDay';
import { type GridType, type FlexContainerProperties } from './Grid';
import { type Alignment } from './Alignment';

export type StyleContextState = {
  sectionDepth: number,
  sectionAlignment: Alignment,
  panelDepth: number,
  timeOfDay: TimeOfDay,
  inHeader: boolean,
  inButton: boolean,
  inButtonGroup: boolean,
  fontSizeRoot: number,
  gridType: ?GridType,
  flexContainerProperties: ?FlexContainerProperties,
  inGridItem: boolean,
  rotation: number,
};
