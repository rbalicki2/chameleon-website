// @flow
export type GridType = 'FLEXBOX' | 'CSS';

export type FlexContainerProperties = {|
  flexDirection?: 'row' | 'column',
  flexWrap?: 'wrap' | 'nowrap' | 'wrap-reverse',
  justifyContent?: 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly',
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline',
  alignContent?: 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around',
|};

export type GridItemProperties = {|
  order: number,
  flexGrow: number,
  flexShrink: number,
  flexBasis: any,
  flex: any,
  alignSelf: 'flex-start' | 'flex-end',
|};
