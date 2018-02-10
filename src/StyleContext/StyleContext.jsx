// @flow
import { type TimeOfDay } from './TimeOfDay';

export type InternalState = {
  sectionDepth: number,
  timeOfDay: TimeOfDay,
};

export default class StyleContext {
  context: InternalState;
  constructor(context: InternalState) {
    this.context = context;
  }

  update(partialContext: $Shape<InternalState>): StyleContext {
    return new StyleContext({
      ...this.context,
      ...partialContext,
    });
  }

  incrementSectionDepth(): StyleContext {
    return this.update({
      sectionDepth: this.context.sectionDepth + 1,
    });
  }

  setTimeOfDay(timeOfDay: TimeOfDay): StyleContext {
    return this.update({
      timeOfDay,
    });
  }
}
