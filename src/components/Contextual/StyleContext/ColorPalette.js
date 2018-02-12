// @flow
import { type StyleContextState } from './StyleContextState';

opaque type Color: string = string;
export type ColorPalette = {|
  bg: Color,
  lightGrayBg: Color,
  fgTitle: Color,
  fgSubtitle: Color,
  fgContrast: Color,
  fgContrastSaturated: Color,
  fgSharpContrast: Color,
  increaseContrastTransparent: Color,
  increaseContrastTransparent2: Color,
  panelBorder: Color,
  panelBg: Color,
  componentBoxShadow: string,
  headerBoxShadow: string,
  elongatedHeaderBoxShadow: string,
  subHeaderBoxShadow: string,
|};

export default (state: StyleContextState): ColorPalette => {
  if (state.timeOfDay === 'DAY') {
    return {
      bg: '#63db2c',
      lightGrayBg: '#c9d4c4',
      fgTitle: '#ec9213',
      fgContrast: '#f3f3f2',
      fgSharpContrast: 'white',
      fgContrastSaturated: '#f6f6f4',
      fgSubtitle: '#726c5f',
      increaseContrastTransparent: 'rgba(80, 80, 70, 0.1)',
      increaseContrastTransparent2: 'rgba(80, 80, 70, 0.11)',
      panelBorder: '#c9d4c4',
      panelBg: 'rgba(255, 255, 255, 0.4)',
      componentBoxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
      headerBoxShadow: '2px 2px 2px rgba(0, 0, 0, 0.1)',
      elongatedHeaderBoxShadow: '2px 3px 2px rgba(0, 0, 0, 0.1)',
      subHeaderBoxShadow: '1px 1px 2px rgba(0, 0, 0, 0.07)',
    };
  }
  // NIGHT
  return {
    bg: '#041197',
    lightGrayBg: '#b9bac6',
    fgTitle: '#cb9310',
    fgContrast: '#041197',
    fgSharpContrast: '#041197',
    fgSubtitle: '#d1d4fa',
    increaseContrastTransparent: 'rgba(30, 30, 30, 0.1)',
    panelBorder: 'rgba(120, 120, 120, 0.2)',
    panelBg: 'rgba(255, 255, 255, 0.4)',
    componentBoxShadow: '0px 2px 4px 0px rgba(255, 255, 255, 0.1)',
    headerBoxShadow: '2px 2px rgba(255, 255, 255, 0.05)',
    elongatedHeaderBoxShadow: '2px 2px rgba(255, 255, 255, 0.05)',
    subHeaderBoxShadow: '1px 1px 2px rgba(255, 255, 255, 0.07)',
  };
};

