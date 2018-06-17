// @flow
import React from 'react';
import styled from 'styled-components';
import ToggleSwitch from 'src/components/Contextual/ToggleSwitch';

type TimeOfDayTogglerProps = {|
  toggleTimeOfDay: () => void,
  isDay: boolean,
|};

const UpperRightDiv = styled.div`
  position: fixed;
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
