// @flow
import { type TimeOfDay } from './TimeOfDay';

export type StyleContextState = {
  sectionDepth: number,
  panelDepth: number,
  timeOfDay: TimeOfDay,
  inAppContainer: boolean,
  inHeader: boolean,
  textSizeMultiple: number,
};
