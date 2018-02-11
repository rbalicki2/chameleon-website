// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { ContextProvider } from './StyleContext';
import { EnterPanel } from './Updaters';

type PanelProps = {
  children: Node,
};

const Panel = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${({ context }) => `
    ${context.panelSpacing}
    ${context.panelColoring}
    transition: ${context.getTransition('all')};
  `}
`;

export default ({ children }: PanelProps) => (<EnterPanel>
  <ContextProvider>{ context =>
    (<Panel context={context}>
      { children }
    </Panel>)
  }</ContextProvider>
</EnterPanel>);
