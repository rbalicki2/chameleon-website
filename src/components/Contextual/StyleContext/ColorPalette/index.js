// @flow
import tinycolor from 'tinycolor2';

import { type StyleContextState } from '../StyleContextState';
import { type TinyColor, NightColors, DayColors, type BaseColors } from './baseColors';

type ColorArray = $ReadOnlyArray<TinyColor>;
const COLOR_ARRAY_LENGTH = 10;

export type ColorPalette = {|
  backgroundColor: TinyColor,

  actionColor: TinyColor,
  actionColorContrast: TinyColor,
  actionColorShadowColor: TinyColor,

  brandColor: TinyColor,

  utilityTextGrays: ColorArray,
  utilityBackgroundColors: ColorArray,
|};

const setHue = (color: TinyColor, newHue: number): TinyColor => {
  const hsv = {
    ...color.toHsv(),
    h: newHue,
  };
  return tinycolor(hsv);
};

const getColorArray = (
  backgroundColor: TinyColor,
  mostExtremeTextLightness: number,
  saturate: number,
  reverse: boolean = false
): ColorArray => {
  // eslint-disable-next-line no-bitwise
  const mixWithWhite = backgroundColor.isLight() ^ (reverse ? 1 : 0);
  const extremeColor = mixWithWhite
    ? tinycolor('black')
    : tinycolor('white');
  const hue: number = backgroundColor.toHsv().h;
  const fn = mixWithWhite ? 'lighten' : 'darken';
  const utilityTextGrays: $ReadOnlyArray<TinyColor> = new Array(COLOR_ARRAY_LENGTH)
    .fill()
    .map((_, i) => (i / (COLOR_ARRAY_LENGTH - 1)))
    .reverse()
    .map(ratio => 1 - ((ratio * (1 - mostExtremeTextLightness)) + mostExtremeTextLightness))
    .map(ratio => ratio * 100)
    .map(val => extremeColor.clone()[fn](val).saturate(saturate))
    .map(color => setHue(color, hue));
  return utilityTextGrays;
};

const getColorPaletteFromBase = (bc: BaseColors): ColorPalette => {
  const {
    backgroundColor,
    mostExtremeTextLightness,
    mostExtremeBackgroundDarkness,
    actionColor,
  } = bc;
  const utilityTextGrays = getColorArray(
    backgroundColor,
    mostExtremeTextLightness,
    25
  );
  const utilityBackgroundColors = getColorArray(
    backgroundColor,
    mostExtremeBackgroundDarkness,
    75,
    true
  );

  const fn = backgroundColor.isLight()
    ? 'darken'
    : 'lighten';
  // console.log(actionColor.clone()[fn](25));

  return {
    backgroundColor: bc.backgroundColor,
    actionColor: bc.actionColor,
    actionColorContrast: tinycolor('white'),
    actionColorShadowColor: actionColor.clone()[fn](5).setAlpha(0.3),
    utilityTextGrays,
    utilityBackgroundColors,
    brandColor: bc.brandColor,
  };
};

export default (state: StyleContextState) => {
  const baseColors: BaseColors = state.timeOfDay === 'DAY'
    ? DayColors
    : NightColors;
  return getColorPaletteFromBase(baseColors);
};
