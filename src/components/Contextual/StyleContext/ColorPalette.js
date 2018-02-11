// @flow
import { type StyleContextState } from './StyleContextState';

opaque type Color: string = string;
export type ColorPalette = {|
  bg: Color,
  lightGrayBg: Color,
  fgTitle: Color,
  panelBorder: Color,
  panelBg: Color,
  componentBoxShadow: string,
|};

export default (state: StyleContextState): ColorPalette => {
  if (state.timeOfDay === 'DAY') {
    return {
      bg: '#63db2c',
      lightGrayBg: '#c9d4c4',
      fgTitle: '#E94951',
      panelBorder: '#c9d4c4',
      panelBg: 'rgba(255, 255, 255, 0.4)',
      componentBoxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
    };
  }
  // NIGHT
  return {
    bg: '#041197',
    lightGrayBg: '#b9bac6',
    fgTitle: 'white',
    panelBorder: 'black',
    panelBg: 'rgba(255, 255, 255, 0.4)',
    componentBoxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
  };
};

