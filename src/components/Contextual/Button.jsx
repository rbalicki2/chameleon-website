// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import { EnterButton } from './Updaters';

const Button = styled.a`
  ${({ context, primary }) => `
    ${context.getButtonProperties(primary)}
  `}
`;

type ButtonProps = {
  children: Node,
  primary: boolean,
};

export default ({
  children,
  primary,
  ...rest
}: ButtonProps) => (
  <EnterButton>
    <ContextProvider>{context =>
      (<Button context={context} primary={primary} {...rest}>
        { children }
      </Button>)
    }</ContextProvider>
  </EnterButton>
);
