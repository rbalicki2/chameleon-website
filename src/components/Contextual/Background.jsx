// @flow
import React from 'react';
import styled from 'styled-components';
import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';

const Bg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  transition: opacity 0.45s linear;
  ${({ bg }) => bg}
  ${({ opacity }) => opacity}
`;

// NOTE: we should get bg from context.colorPalette, but since we're actually
// rendering both and transitioning them via opacity, it's way more convenient
// to have it here, because otherwise we wouldn't be able to access the
// non-active background gradient
const bgByTimeOfDay = {
  DAY: `
    background: linear-gradient(135deg, #fdfc52, #63db2c);
  `,
  NIGHT: `
    background: linear-gradient(135deg, #041197, #3A14A4);
  `,
};

const opacityBySelected = selected => `opacity: ${selected ? 1 : 0}`;

export default () => (<ContextProvider>{(context: StyleContext) => {
  const { timeOfDay } = context;
  return (<div>
    <Bg
      opacity={opacityBySelected(timeOfDay === 'DAY')}
      bg={bgByTimeOfDay.DAY}
    />
    <Bg
      opacity={opacityBySelected(timeOfDay === 'NIGHT')}
      bg={bgByTimeOfDay.NIGHT}
    />
  </div>);
}}</ContextProvider>);
