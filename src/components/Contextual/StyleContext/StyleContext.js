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

  enterHeader(): StyleContext {
    if (this.state.inHeading) {
      throw new Error('Do not nest Header-like components');
    }
    return this.update({
      inHeader: true,
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

  get isInPanel(): boolean {
    return this.state.panelDepth !== 0;
  }

  get headerTextProperties(): string {
    const { panelDepth, sectionDepth } = this.state;
    const fontSize = 50 - (panelDepth * 10) - (sectionDepth * 5);
    const fontWeight = 800 - (panelDepth * 200) - (sectionDepth * 100);
    const lineSpacing = fontWeight >= 800
      ? 'letter-spacing: 1px;'
      : '';

    return `
      font-size: ${fontSize}px;
      line-height: 1.5em;
      font-family: 'Muli';
      font-weight: ${fontWeight};
      text-align: ${this.isInPanel ? 'center' : 'left'};
      ${lineSpacing}
      margin-bottom: ${fontSize / 3}px;
      text-shadow: ${this.colorPalette.headerBoxShadow};
    `;
  }

  get headerColor(): string {
    return `
      color: ${this.colorPalette.fgTitle};
    `;
  }

  get subHeaderTextProperties(): string {
    const { panelDepth, sectionDepth } = this.state;
    const fontSize = 18 - (panelDepth * 5) - (sectionDepth * 3);
    const fontWeight = 600 - (panelDepth * 200) - (sectionDepth * 100);
    return `
      margin-top: ${-1 * fontSize * 1.25}px;
      margin-bottom: ${fontSize}px;
      line-height: 1.5em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-family: 'Muli';
      font-size: ${fontSize}px;
      text-align: ${this.isInPanel ? 'center' : 'left'};
      font-weight: ${fontWeight};
      text-shadow: ${this.colorPalette.subHeaderBoxShadow};
    `;
  }

  get subHeaderColor(): string {
    return `
      color: ${this.colorPalette.fgSubtitle};
    `;
  }
}
