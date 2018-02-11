// @flow
import { type StyleContextState } from './StyleContextState';

opaque type Color = string;
export type ColorPalette = {
  bg: Color,
  lightGrayBg: Color,
  fgTitle: Color,
};

export default (state: StyleContextState): ColorPalette => {
  if (state.timeOfDay === 'DAY') {
    return {
      bg: '#63db2c',
      lightGrayBg: '#c9d4c4',
      fgTitle: '#E94951',
    };
  }
  return {
    bg: '#041197',
    lightGrayBg: '#b9bac6',
    fgTitle: 'white',
  };
};

