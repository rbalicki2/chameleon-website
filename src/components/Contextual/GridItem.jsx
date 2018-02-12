// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import { type GridItemProperties } from './StyleContext/Grid';
import { EnterGridItem } from './Updaters';

const GridItem = styled.div`
  ${({ context, gridItemProps }) => `
    ${context.getGridItemLayout(gridItemProps)}
  `}
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
  <EnterGridItem>
    <ContextProvider>{context =>
      (<GridItem context={context} gridItemProps={gridItemProperties} {...rest}>
        { children }
      </GridItem>)
    }</ContextProvider>
  </EnterGridItem>
);
