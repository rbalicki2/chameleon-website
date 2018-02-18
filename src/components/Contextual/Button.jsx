// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ContextProvider } from './StyleContext';
import { EnterButton } from './Updaters';

// N.B.: passing props directly to Link results in an error being
// thrown, so we need to filter them out. Lame!
// https://github.com/styled-components/styled-components/issues/305
const InternalButton = styled(({ context, primary, ...rest }) => <Link {...rest} />)`
  ${({ context, primary }) => `
    ${context.getButtonProperties(primary)}
  `}
`;

const ExternalButton = styled.a`
  ${({ context, primary }) => `
    ${context.getButtonProperties(primary)}
  `}
`;

type ButtonProps = {
  children: Node,
  primary: boolean,
  to?: string,
  href?: string,
};

export default ({
  children,
  primary,
  to,
  href,
  ...rest
}: ButtonProps) => (<EnterButton>
  <ContextProvider>{(context) => {
    const internalComp = to
      ? (<InternalButton context={context} primary={primary} {...rest} to={to}>
        { children }
      </InternalButton>)
      : (<ExternalButton context={context} primary={primary} href={href} {...rest}>
        { children }
      </ExternalButton>);
    return internalComp;
  }}</ContextProvider>
</EnterButton>);
