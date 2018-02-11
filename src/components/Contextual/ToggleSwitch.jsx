// @flow
import React from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';
import type StyleContext from './StyleContext/StyleContext';

// https://www.w3schools.com/howto/howto_css_switch.asp

const Outer = styled.div`
  width: 60px;
  height: 34px;
  position: relative;
`;

const Slider = styled.span`
  border-radius: 34px;
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${({ bg }) => bg};
  -webkit-transition: .4s;
  transition: .4s;

  &:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
    border-radius: 50%;

    ${({ isChecked }) => (
    isChecked
      ? `
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      `
      : ''
  )}
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
    (<Outer onClick={onClick} >
      <Slider
        isChecked={isChecked}
        bg={
          context.context.timeOfDay === 'DAY'
            ? '#c9d4c4'
            : '#b9bac6'
        }
      />
    </Outer>)
  }</ContextProvider>
);
