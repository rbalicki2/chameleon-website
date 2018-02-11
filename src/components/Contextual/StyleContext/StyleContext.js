// @flow
import { type TimeOfDay } from './TimeOfDay';
import generateColorPalette, { type ColorPalette } from './ColorPalette';
import { type StyleContextState } from './StyleContextState';
import { type BreakpointName } from './BreakpointName';

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

  incrementPanelDepth(): StyleContext {
    if (this.state.panelDepth === 2) {
      throw new Error('Do not nest <Panel> components more than twice');
    }
    return this.update({
      panelDepth: this.state.panelDepth + 1,
      sectionDepth: 0,
    });
  }

  setTimeOfDay(timeOfDay: TimeOfDay): StyleContext {
    return this.update({
      timeOfDay,
    });
  }

  enterAppContainer(): StyleContext {
    if (this.state.inAppContainer) {
      throw new Error('Do not nest <AppContainer /> components');
    }
    return this.update({
      inAppContainer: true,
    });
  }

  enterHeading(): StyleContext {
    if (this.state.inHeading) {
      throw new Error('Do not nest <Heading /> components');
    }
    return this.update({
      inHeading: true,
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

  // eslint-disable-next-line class-methods-use-this
  getMediaQuery(breakpointName: BreakpointName): string {
    const minWidth = ({
      DESKTOP: 1024,
      TABLET: 768,
      MOBILE: 0,
    })[breakpointName];
    return `screen and (min-width: ${minWidth}px)`;
  }

  get panelSpacing(): string {
    return `
      padding: ${50 - (this.state.panelDepth * 10)}px;
      margin-bottom: ${25 - (this.state.panelDepth * 5)}px;
    `;
  }

  get panelColoring(): string {
    return `
      border: 1px solid ${this.colorPalette.panelBorder};
      background-color: ${this.colorPalette.panelBg};
      box-shadow: ${this.colorPalette.componentBoxShadow};
    `;
  }
}
