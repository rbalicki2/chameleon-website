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

  enterJumbotron(): StyleContext {
    if (this.state.sectionDepth !== 0) {
      throw new Error('Do not nest <Jumbotron /> components inside <Section /> components');
    }
    if (this.state.panelDepth !== 0) {
      throw new Error('Do not nest <Jumbotron /> components inside <Panel /> components');
    }
    return this.update({
      sectionDepth: 1,
      textSizeMultiple: 1.4,
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
    if (!this.state.sectionDepth) {
      throw new Error('Header-like components must be inside of sections');
    }
    if (this.state.inHeader) {
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
    const fontSize = (55 - (panelDepth * 10) - (sectionDepth * 5)) * this.state.textSizeMultiple;
    const fontWeight = 900 - (panelDepth * 200) - (sectionDepth * 100);
    const lineSpacing = fontWeight >= 800
      ? 'letter-spacing: 1px;'
      : '';

    return `
      font-size: ${fontSize}px;
      line-height: 1.5em;
      font-family: 'Muli';
      font-weight: ${fontWeight};
      text-align: ${this.isInPanel ? 'left' : 'center'};
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
    const fontSize = (21 - (panelDepth * 5) - (sectionDepth * 3)) * this.state.textSizeMultiple;
    const fontWeight = 600 - (panelDepth * 200) - (sectionDepth * 100);
    return `
      margin-top: ${-1 * fontSize}px;
      margin-bottom: ${fontSize}px;
      line-height: 1.5em;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-family: 'Muli';
      font-size: ${fontSize}px;
      text-align: ${this.isInPanel ? 'left' : 'center'};
      font-weight: ${fontWeight};
      text-shadow: ${this.colorPalette.subHeaderBoxShadow};
    `;
  }

  get subHeaderColor(): string {
    return `
      color: ${this.colorPalette.fgSubtitle};
    `;
  }

  get sectionMargins(): string {
    const { sectionDepth } = this.state;
    return `
      margin: 0 0 ${150 - (20 * sectionDepth)}px 0;
      &:last-child {
        margin-bottom: 0;
      }
    `;
  }
}
