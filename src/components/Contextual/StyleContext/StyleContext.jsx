// @flow
import { type TimeOfDay } from './TimeOfDay';
import generateColorPalette, { type ColorPalette } from './ColorPalette';
import { type StyleContextState } from './StyleContextState';

export default class StyleContext {
  // TODO rename this to .state
  context: StyleContextState;
  constructor(context: StyleContextState) {
    this.context = context;
  }

  update(partialContext: $Shape<StyleContextState>): StyleContext {
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

  get timeOfDay(): TimeOfDay {
    return this.context.timeOfDay;
  }

  get colorPalette(): ColorPalette {
    return generateColorPalette(this.context);
  }
}
