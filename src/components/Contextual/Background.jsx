// @flow
import React from 'react';
import styled from 'styled-components';
import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';

// TODO do this in StyleContext
const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  transition: ${({ context }) => context.getTransition()};
  ${({ context }) => `
    background-color: ${context.colorPalette.backgroundColor.toHex8String()};
  `}
  background-blend-mode: hue;
`;

export default () => (<ContextProvider>{(context: StyleContext) =>
  <Bg context={context} />
}</ContextProvider>);
