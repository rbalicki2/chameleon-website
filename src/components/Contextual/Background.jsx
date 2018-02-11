// @flow
import React from 'react';
import styled from 'styled-components';
import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';
import type TimeOfDay from './StyleContext/TimeOfDay';

const commonStyle = `
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: -1;
  transition: all 0.45s;
`;

// $FlowFixMe
const bgByTimeOfDay: { [TimeOfDay]: string } = {
  DAY: `
    background: linear-gradient(135deg, #fdfc52, #63db2c);
  `,
  NIGHT: `
    background: linear-gradient(135deg, #041197, #3A14A4);
  `,
};

export default () => (<ContextProvider>{(context: StyleContext) => {
  const Bg = styled.span`
    ${commonStyle}
    ${bgByTimeOfDay[context.context.timeOfDay]}
  `;
  return <Bg />;
}}</ContextProvider>);
