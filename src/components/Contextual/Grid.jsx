// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import { EnterGrid } from './Updaters';
import { type GridType, type FlexContainerProperties } from './StyleContext/Grid';

const Grid = styled.div`
  ${({ context }) => `
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
  <EnterGrid gridType={gridType} flexContainerProperties={flexContainerProperties}>
    <ContextProvider>{context =>
      (<Grid context={context}>
        { children }
      </Grid>)
    }</ContextProvider>
  </EnterGrid>
);
