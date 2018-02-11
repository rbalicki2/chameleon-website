// @flow
import { type TimeOfDay } from './TimeOfDay';
import generateColorPalette, { type ColorPalette } from './ColorPalette';
import { type StyleContextState } from './StyleContextState';

type CssProperty = string;
type CssDeclaration = string;
type CssTimingFunction = string;

export default class StyleContext {
  // TODO rename this to .state
  state: StyleContextState;
  constructor(context: StyleContextState) {
    this.state = context;
  }

  update(partialContext: $Shape<StyleContextState>): StyleContext {
    return new StyleContext({
      ...this.state,
      ...partialContext,
    });
  }

  incrementSectionDepth(): StyleContext {
    return this.update({
      sectionDepth: this.state.sectionDepth + 1,
    });
  }

  setTimeOfDay(timeOfDay: TimeOfDay): StyleContext {
    return this.update({
      timeOfDay,
    });
  }

  get timeOfDay(): TimeOfDay {
    return this.state.timeOfDay;
  }

  get colorPalette(): ColorPalette {
    return generateColorPalette(this.state);
  }

  // eslint-disable-next-line class-methods-use-this
  getTransition(
    cssProperty: CssProperty = 'all',
    timingFunction: CssTimingFunction = 'ease-in-out'
  ): CssDeclaration {
    return `${cssProperty} 0.4s ${timingFunction}`;
  }
}
