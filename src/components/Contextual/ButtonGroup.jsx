// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider, UpdateContext } from './StyleContext';

const ButtonGroup = styled.div`
  ${({ context }) => context.buttonGroupStyles}
`;

type ButtonGroupProps = {|
  children: Node,
|};

export default ({
  children,
}: ButtonGroupProps) => (
  <UpdateContext call={context => context.enterButtonGroup()}>
    <ContextProvider>{context =>
      (<ButtonGroup context={context}>
        { children }
      </ButtonGroup>)
    }</ContextProvider>
  </UpdateContext>
);
