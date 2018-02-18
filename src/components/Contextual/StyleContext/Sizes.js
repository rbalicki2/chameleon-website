// @flow
export type SizeArray = $ReadOnlyArray<number>;

// TODO don't assume +1 for section...
export const JUMBOTRON_FONT_ROOT = -1;
export const BASE_FONT_ROOT = 1;
export const SUBHEADER_OFFSET = 6;
export const PARAGRAPH_OFFSET = 7;

export const FONT_SIZES = [
  80, // 0 - jumbotron base
  64,
  56,
  48,
  40,
  36, // 5
  32,
  28,
  24,
  22,
  20, // 10
  18,
];

export const COMPONENT_PADDINGS = [
  200, // 0 - jumbotron
  160,
  120,
  96,
  84,
  72, // 5
  64,
  40,
  36,
  32,
  28, // 10
  24,
  22,
  20,
  18,
  16,
];
