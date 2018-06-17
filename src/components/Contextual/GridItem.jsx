// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider, UpdateContext } from './StyleContext';
import { type GridItemProperties } from './StyleContext/Grid';

const GridItem = styled.div`
  ${({ context, gridItemProps }) => `
    ${context.getGridItemLayout(gridItemProps)}
  `}
`;

const InnerGridItem = styled.div`
  ${({ context }) => context.innerGridItemLayout}
`;

type GridItemProps = {
  children: Node,
  gridItemProperties: GridItemProperties,
};

export default ({
  children,
  gridItemProperties = {},
  ...rest
}: GridItemProps) => (
  <UpdateContext call={context => context.enterGridItem()}>
    <ContextProvider>{context =>
      (<GridItem context={context} gridItemProps={gridItemProperties} {...rest}>
        <InnerGridItem context={context}>{ children }</InnerGridItem>
      </GridItem>)
    }</ContextProvider>
  </UpdateContext>
);
