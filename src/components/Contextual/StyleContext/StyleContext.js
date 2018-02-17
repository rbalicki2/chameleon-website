// @flow
import { type TimeOfDay } from './TimeOfDay';
import generateColorPalette, { type ColorPalette } from './ColorPalette';
import { type StyleContextState } from './StyleContextState';
import { type GridAction } from './Action';
import { type GridItemProperties } from './Grid';
import { JUMBOTRON_FONT_ROOT, FONT_SIZES, SUBHEADER_OFFSET, PARAGRAPH_OFFSET } from './Sizes';

type CssProperty = string;
type CssDeclaration = string;
type CssTimingFunction = string;

const FONT_FAMILY = 'font-family: \'Muli\';';

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
      fontSizeRoot: JUMBOTRON_FONT_ROOT,
      sectionAlignment: 'center',
      sectionDepth: 1,
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

  enterButton(): StyleContext {
    if (this.state.inButton) {
      throw new Error('Do not nest <Button /> components');
    }
    // TODO don't nest other stuff in buttons, too
    return this.update({
      inButton: true,
    });
  }

  enterButtonGroup(): StyleContext {
    if (this.state.inButtonGroup) {
      throw new Error('Do not nest <ButtonGroup /> components');
    }
    return this.update({
      inButtonGroup: true,
    });
  }

  enterGrid(action: GridAction): StyleContext {
    if (action.gridType === 'FLEXBOX') {
      return this.update({
        inGridItem: false,
        gridType: action.gridType,
        flexContainerProperties: action.flexContainerProperties,
      });
    }
    // N.B. this messes up formatting, but it should be uncommented:
    // (action: empty);
    throw new Error('Non-flexbox grid not implemented');
  }

  enterGridItem(): StyleContext {
    if (!this.state.gridType) {
      throw new Error('Cannot enter grid item without grid');
    }
    if (this.state.inGridItem) {
      throw new Error('Do not nest grid items without a grid');
    }
    return this.update({
      inGridItem: true,
      gridType: undefined,
      flexContainerProperties: undefined,
    });
  }

  get timeOfDay(): TimeOfDay {
    return this.state.timeOfDay;
  }

  get gridLayout(): string {
    if (this.state.gridType === 'FLEXBOX' && this.state.flexContainerProperties) {
      // LOL @ eslint... spacing
      const {
        flexDirection,
        flexWrap,
        justifyContent,
        alignContent,
        alignItems,
      } = this.state.flexContainerProperties;

      const flexDirectionString = flexDirection ? `flex-direction: ${flexDirection};` : '';
      const flexWrapString = flexWrap ? `flex-wrap: ${flexWrap};` : '';
      const justifyContentString = justifyContent ? `justify-content: ${justifyContent};` : '';
      const alignContentString = alignContent ? `align-content: ${alignContent};` : '';
      const alignItemsString = alignItems ? `align-items: ${alignItems};` : '';

      return `
        display: flex;
        ${flexDirectionString}
        ${flexWrapString}
        ${justifyContentString}
        ${alignContentString}
        ${alignItemsString}
      `;
    }
    throw new Error('Unhandled gridType');
  }

  // eslint-disable-next-line class-methods-use-this
  getGridItemLayout(gridItemProps: GridItemProperties): string {
    // TODO do this method
    const {
      order,
      flexGrow,
      flexShrink,
      flexBasis,
      flex,
      alignSelf,
    } = gridItemProps;
    const orderString = order ? `order: ${order};` : '';
    const flexGrowString = flexGrow ? `flex-grow: ${flexGrow};` : '';
    const flexBasisString = flexBasis ? `flex-basis: ${flexBasis};` : '';
    const flexShrinkString = flexShrink ? `flex-shrink: ${flexShrink}` : '';
    const flexString = flex ? `flex: ${flex};` : '';
    const alignSelfString = alignSelf ? `align-self: ${alignSelf};` : '';
    return `
      ${orderString}
      ${flexGrowString}
      ${flexString}
      ${flexShrinkString}
      ${flexBasisString}
      ${alignSelfString}
    `;
  }

  get colorPalette(): ColorPalette {
    return generateColorPalette(this.state);
  }

  // eslint-disable-next-line class-methods-use-this
  getTransition(
    cssProperty: CssProperty = 'all',
    timing: number = 400,
    timingFunction: CssTimingFunction = 'ease-in-out'
  ): CssDeclaration {
    return `${cssProperty} ${timing}ms ${timingFunction}`;
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

  get paragraphProperties(): string {
    const fontSize = this.getFontSize(PARAGRAPH_OFFSET);

    return `
      font-weight: 300;
      font-size: ${fontSize}px;
      line-height: 1.5em;
      ${FONT_FAMILY}
      margin-bottom: ${fontSize}px;
      color: ${this.colorPalette.fgBodyText};

      &:last-child {
        margin-bottom: 0;
      }
    `;
  }

  get headerTextProperties(): string {
    const { panelDepth, sectionDepth } = this.state;
    const fontSize = FONT_SIZES[this.state.fontSizeRoot + sectionDepth + (2 * panelDepth)];
    const fontWeight = 900 - (panelDepth * 200) - (sectionDepth * 100);
    const lineSpacing = fontWeight >= 800
      ? 'letter-spacing: 1px;'
      : '';

    return `
      font-size: ${fontSize}px;
      line-height: 1.5em;
      ${FONT_FAMILY}
      font-weight: ${fontWeight};
      text-align: ${this.isInPanel ? 'left' : 'center'};
      ${lineSpacing}
      margin-bottom: ${fontSize / 3}px;
      text-shadow: ${this.colorPalette.headerBoxShadow};
      color: ${this.colorPalette.fgTitle};
    `;
  }

  getFontSize(offset: number): number {
    return FONT_SIZES[
      this.state.fontSizeRoot
        + this.state.sectionDepth
        + (2 * this.state.panelDepth)
        + offset
    ];
  }

  get subHeaderTextProperties(): string {
    const fontSize = this.getFontSize(SUBHEADER_OFFSET);
    const fontWeight = 200;
    return `
      margin-top: ${-1 * fontSize}px;
      margin-bottom: ${1.5 * fontSize}px;
      line-height: 1.5em;
      text-transform: uppercase;
      letter-spacing: 1px;
      ${FONT_FAMILY}
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
      text-align: ${this.state.sectionAlignment};
    `;
  }

  getButtonColor(isPrimary: boolean): string {
    const fgColor = isPrimary
      ? this.colorPalette.fgTitle
      : this.colorPalette.fgSharpContrast;
    const bgColor = isPrimary
      ? this.colorPalette.fgContrast
      : this.colorPalette.increaseContrastTransparent;
    const bgSaturated = isPrimary
      ? this.colorPalette.fgContrastSaturated
      : this.colorPalette.increaseContrastTransparent2;
    const borderSize = this.state.panelDepth ? '1px' : '3px';

    return `
      color: ${fgColor};
      background-color: ${bgColor};
      border: ${borderSize} solid ${fgColor};
      box-shadow: ${this.colorPalette.headerBoxShadow};
      text-shadow: ${this.colorPalette.subHeaderBoxShadow};
      transform: none;
      transition: ${this.getTransition('all', 100)};

      &:hover {
        transform: translateY(-1px);
        box-shadow: ${this.colorPalette.elongatedHeaderBoxShadow};
        background-color: ${bgSaturated};
      }
    `;
  }

  get buttonSize(): string {
    const fontSize = this.getFontSize(PARAGRAPH_OFFSET);
    // const padding = (19 - (panelDepth * 5) - (sectionDepth * 3)) * this.state.headerSizeMultiple;
    const padding = 10;
    return `
      font-size: ${fontSize}px;
      padding: ${padding}px;
      ${FONT_FAMILY}
    `;
  }

  get buttonGroupStyles(): string {
    const { panelDepth, sectionDepth } = this.state;
    const padding = 36 - (sectionDepth * 4) - (panelDepth * 8);
    return `
      margin: ${padding * 2}px 0;
      & > * {
        margin-right: ${padding}px;
        margin-left: ${padding}px;
        &:first-child {
          margin-left: 0;
        }
        &:last-child {
          margin-right: 0;
        }
      }
    `;
  }
}
