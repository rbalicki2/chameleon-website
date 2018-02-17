// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import { EnterHeader } from './Updaters';

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
  <EnterHeader>
    <ContextProvider>{context =>
      (<Header context={context}>
        { children }
      </Header>)
    }</ContextProvider>
  </EnterHeader>
);
