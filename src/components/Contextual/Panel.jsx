// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { ContextProvider, UpdateContext } from './StyleContext';

type PanelProps = {
  children: Node,
};

const Panel = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${({ context }) => `
    ${context.panelProperties}
    transition: ${context.getTransition('all')};
  `}
`;

export default ({ children }: PanelProps) => (<UpdateContext call={context => context.enterPanel()}>
  <ContextProvider>{ context =>
    (<Panel context={context}>
      { children }
    </Panel>)
  }</ContextProvider>
</UpdateContext>);
