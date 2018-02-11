// @flow
import React from 'react';
import { type TimeOfDay } from 'src/components/Contextual/StyleContext/TimeOfDay';

type ToggleTimeOfDay = () => void;

export default ({
  toggleTimeOfDay,
}: {
  toggleTimeOfDay: ToggleTimeOfDay,
}) => (<div>
  <div onClick={toggleTimeOfDay}>t o d</div>
</div>);
