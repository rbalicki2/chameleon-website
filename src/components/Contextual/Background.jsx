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
`;

// $FlowFixMe
const bgByTimeOfDay: { [TimeOfDay]: string } = {
  DAY: `
    background-color: yellow;
  `,
  NIGHT: `
    background-color: blue;
  `,
};

export default () => (<ContextProvider>{(context: StyleContext) => {
  const Bg = styled.span`
    ${commonStyle}
    ${bgByTimeOfDay[context.context.timeOfDay]}
  `;
  return <Bg />;
}}</ContextProvider>);
