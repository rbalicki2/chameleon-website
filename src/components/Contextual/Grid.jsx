// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider, UpdateContext } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';
import { type GridType, type FlexContainerProperties } from './StyleContext/Grid';

const Grid = styled.div`
  ${({ context }: { context: StyleContext }) => `
    ${context.gridLayout}
  `}
`;

type GridProps = {|
  children: Node,
  gridType: GridType,
  flexContainerProperties: FlexContainerProperties,
|};

export default ({
  children,
  gridType,
  flexContainerProperties,
}: GridProps) => (
  <UpdateContext call={context => context.enterGrid(gridType, flexContainerProperties)}>
    <ContextProvider>{context =>
      (<Grid context={context}>
        { children }
      </Grid>)
    }</ContextProvider>
  </UpdateContext>
);
