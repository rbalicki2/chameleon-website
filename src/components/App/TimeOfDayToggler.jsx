// @flow
import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from '../Contextual/ToggleSwitch';

type TimeOfDayTogglerProps = {|
  toggleTimeOfDay: ToggleTimeOfDay,
  isDay: boolean,
|};

const UpperRightDiv = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
`;

export default ({
  toggleTimeOfDay,
  isDay,
}: TimeOfDayTogglerProps) => (<UpperRightDiv>
  <ToggleSwitch
    isChecked={isDay}
    onClick={toggleTimeOfDay}
  />
</UpperRightDiv>);
