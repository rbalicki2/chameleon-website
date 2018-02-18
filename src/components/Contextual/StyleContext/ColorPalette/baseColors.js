// @flow
import tinycolor from 'tinycolor2';

export type TinyColor = tinycolor;

export type BaseColors = {|
  backgroundColor: TinyColor,
  brandColor: TinyColor,
  actionColor: TinyColor,
  mostExtremeTextLightness: number, // (or darkness)
  mostExtremeBackgroundDarkness: number, // (or lightness)
|};

export const DayColors: BaseColors = {
  backgroundColor: tinycolor('#fcfae8'), // yellow
  actionColor: tinycolor('#0a7623'),
  brandColor: tinycolor('#ec9213'),
  mostExtremeTextLightness: 0.47,
  mostExtremeBackgroundDarkness: 0.3,
};

export const NightColors: BaseColors = {
  backgroundColor: tinycolor('blue'),
  actionColor: tinycolor('#319E4A'),
  brandColor: tinycolor('#ec9213'),
  mostExtremeTextLightness: 0.47,
  mostExtremeBackgroundDarkness: 0.47,
};
