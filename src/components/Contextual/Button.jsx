// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ContextProvider, UpdateContext } from './StyleContext';

// N.B.: passing props directly to Link results in an error being
// thrown, so we need to filter them out. Lame!
// https://github.com/styled-components/styled-components/issues/305
const InternalButton = styled(({ context, primary, block, ...rest }) => <Link {...rest} />)`
  ${({ context, primary, block }) => `
    ${context.getButtonProperties(primary, block)}
  `}
`;

const ExternalButton = styled.a`
  ${({ context, primary, block }) => `
    ${context.getButtonProperties(primary, block)}
  `}
`;

type ButtonProps = {
  children: Node,
  primary?: boolean,
  to?: string,
  href?: string,
};

export default ({
  children,
  primary = true,
  to,
  href,
  ...rest
}: ButtonProps) => (<UpdateContext call={context => context.enterButton()}>
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
</UpdateContext>);
