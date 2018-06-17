// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider, UpdateContext } from './StyleContext';

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
  <UpdateContext call={context => context.enterHeader()}>
    <ContextProvider>{context =>
      (<Subheader context={context}>
        { children }
      </Subheader>)
    }</ContextProvider>
  </UpdateContext>
);
