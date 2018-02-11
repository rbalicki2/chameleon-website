// @flow
export type BreakpointName = 'DESKTOP' | 'MOBILE' | 'TABLET';

export default (breakpointName: BreakpointName): string => {
  const minWidth = ({
    DESKTOP: 1024,
    TABLET: 768,
    MOBILE: 0,
  })[breakpointName];
  return `screen and (min-width: ${minWidth}px)`;
};
