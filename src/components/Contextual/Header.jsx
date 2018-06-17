// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider, UpdateContext } from './StyleContext';

const Header = styled.div`
  ${({ context }) => `
    ${context.headerTextProperties}
  `}
`;

type HeaderProps = {|
  children: Node,
|};

export default ({
  children,
}: HeaderProps) => (
  <UpdateContext call={context => context.enterHeader()}>
    <ContextProvider>{context =>
      (<Header context={context}>
        { children }
      </Header>)
    }</ContextProvider>
  </UpdateContext>
);
