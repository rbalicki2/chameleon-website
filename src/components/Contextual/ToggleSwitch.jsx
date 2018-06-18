// @flow
import React from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';

// https://www.w3schools.com/howto/howto_css_switch.asp

const SIZE = 26;
const Outer = styled.div`
  width: 60px;
  height: 34px;
  position: relative;
  margin-bottom: 20px;
`;

const Slider = styled.span`
  ${({ context }) => `
    background-color: ${context.colorPalette.utilityBackgroundColors[3].toHex8String()};
    transition: ${context.getTransition()};
    box-shadow: ${context.colorPalette.componentBoxShadow};
    border-radius: 34px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  `}

  &:before {
    position: absolute;
    content: "";
    height: ${SIZE}px;
    width: ${SIZE}px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    border-radius: 50%;
    ${({ context, isChecked }) => `
      transition: ${context.getTransition()};
      transform: ${isChecked ? `translateX(${SIZE}px)` : 'none'};
    `}
  }
`;

type ToggleSwitchProps = {|
  isChecked: boolean,
  onClick: () => void,
|};

export default ({
  isChecked,
  onClick,
}: ToggleSwitchProps) => (
  <ContextProvider>{(context: StyleContext) =>
    (<Outer onClick={onClick}>
      <Slider
        isChecked={isChecked}
        context={context}
      />
    </Outer>)
  }</ContextProvider>
);
