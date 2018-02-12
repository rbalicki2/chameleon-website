// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import { EnterButtonGroup } from './Updaters';

const ButtonGroup = styled.div`
  ${({ context }) => context.buttonGroupStyles}
`;

type ButtonGroupProps = {|
  children: Node,
|};

export default ({
  children,
}: ButtonGroupProps) => (
  <EnterButtonGroup>
    <ContextProvider>{context =>
      (<ButtonGroup context={context}>
        { children }
      </ButtonGroup>)
    }</ContextProvider>
  </EnterButtonGroup>
);
