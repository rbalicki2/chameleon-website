// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import { EnterHeader } from './Updaters';

const Subheader = styled.div`
  ${({ context }) => `
    ${context.subHeaderTextProperties}
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
      (<Subheader context={context}>
        { children }
      </Subheader>)
    }</ContextProvider>
  </EnterHeader>
);
