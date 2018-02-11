// @flow
import React from 'react';
import styled from 'styled-components';
import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';
import type TimeOfDay from './StyleContext/TimeOfDay';

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

// $FlowFixMe
const bgByTimeOfDay: { [TimeOfDay]: string, isSelected: boolean, } = {
  DAY: `
    background: linear-gradient(135deg, #fdfc52, #63db2c);
  `,
  NIGHT: `
    background: linear-gradient(135deg, #041197, #3A14A4);
  `,
};

const opacityBySelected = selected => `opacity: ${selected ? 1 : 0}`;

export default () => (<ContextProvider>{(context: StyleContext) => {
  // const BgNight = styled.span`
  //   ${commonStyle}
  //   ${bgByTimeOfDay.NIGHT}
  //   ${opacityBySelected(context.context.timeOfDay === 'NIGHT')}
  // `;
  // const BgDay = styled.span`
  //   ${commonStyle}
  //   ${bgByTimeOfDay.DAY}
  //   ${opacityBySelected(context.context.timeOfDay === 'DAY')}
  // `;
  const { timeOfDay } = context.context;
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
