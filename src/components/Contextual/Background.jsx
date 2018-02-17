// @flow
import React from 'react';
import styled from 'styled-components';
import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';

const Bg = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  transition: ${({ context }) => context.getTransition('opacity')};
  ${({ opacity }) => opacity}
  ${({ context }) => `
    background-color: ${context.colorPalette.backgroundColor.toHex8String()};
  `}
  background-blend-mode: hue;
`;

const opacityBySelected = selected => `opacity: ${selected ? 1 : 0};`;

export default () => (<ContextProvider>{(context: StyleContext) => {
  const { timeOfDay } = context;
  return (<div>
    <Bg
      opacity={opacityBySelected(timeOfDay === 'NIGHT')}
      context={context}
    />
    <Bg
      opacity={opacityBySelected(timeOfDay === 'DAY')}
      context={context}
    />

  </div>);
}}</ContextProvider>);
