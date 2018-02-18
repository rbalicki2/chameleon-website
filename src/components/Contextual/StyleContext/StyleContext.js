// @flow
import { type TimeOfDay } from './TimeOfDay';
import generateColorPalette, { type ColorPalette } from './ColorPalette';
import { type StyleContextState } from './StyleContextState';
import { type GridAction } from './Action';
import { type GridItemProperties } from './Grid';
import {
  JUMBOTRON_FONT_ROOT,
  FONT_SIZES,
  SUBHEADER_OFFSET,
  PARAGRAPH_OFFSET,
  COMPONENT_PADDINGS,
} from './Sizes';
import { type TinyColor } from './ColorPalette/baseColors';
import getMediaQuery from './getMediaQuery';

type CssProperty = string;
type CssDeclaration = string;
type CssTimingFunction = string;

const FONT_FAMILY = 'font-family: \'Muli\';';

// TODO memoize every method
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

  getBoxShadow(
    colorOffset: number,
    h: number = 0,
    v: number = 2,
    blur: number = 4,
    spread: number = 0
  ): CssProperty {
    const color = this.colorPalette.utilityBackgroundColors[colorOffset];
    return this.getBoxShadowFromColor(color, h, v, blur, spread);
  }

  // eslint-disable-next-line class-methods-use-this
  getBoxShadowFromColor(
    color: TinyColor,
    h: number = 0,
    v: number = 2,
    blur: number = 4,
    spread: number = 0
  ): CssProperty {
    return `${h}px ${v}px ${blur}px ${spread}px ${color.toHex8String()}`;
  }

  getTextShadow(
    colorOffset: number,
    h: number = 0,
    v: number = 2,
    blur: number = 4
  ): CssProperty {
    const color = this.colorPalette.utilityTextGrays[colorOffset].toHex8String();
    return `${h}px ${v}px ${blur}px ${color}`;
  }

  get panelProperties(): string {
    const { panelDepth } = this.state;
    const panelColors = this.colorPalette.utilityBackgroundColors;
    return `
      padding: ${this.getComponentPadding(5)}px;
      margin-bottom: ${this.getComponentPadding(11)}px;
      background-color: ${panelColors[panelDepth].toHex8String()};
      border: 1px solid ${panelColors[3 + panelDepth].toHex8String()};
      box-shadow: ${this.getBoxShadow(3)};
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
      margin-bottom: ${this.getComponentPadding(9)}px;
      color: ${this.colorPalette.utilityTextGrays[3].toHex8String()};

      &:last-child {
        margin-bottom: 0;
      }

      a {
        color: ${this.colorPalette.actionColor.toHex8String()};
        font-weight: 600;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    `;
  }

  get headerTextProperties(): string {
    const { panelDepth, sectionDepth } = this.state;
    const fontSize = this.getFontSize(0);
    const fontWeight = 900 - (panelDepth * 200) - (sectionDepth * 100);
    const lineSpacing = fontWeight >= 800
      ? 'letter-spacing: 1px;'
      : '';

    return `
      font-size: ${fontSize}px;
      line-height: 1.3em;
      ${FONT_FAMILY}
      font-weight: ${fontWeight};
      text-align: ${this.isInPanel ? 'left' : 'center'};
      ${lineSpacing}
      margin-bottom: ${this.headerMargin}px;
      text-shadow: ${this.getTextShadow(9)};
      color: ${this.colorPalette.brandColor.toHex8String()};
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

  get headerMargin(): number {
    return this.getComponentPadding(5);
  }

  get subHeaderTextProperties(): string {
    // margin-top must match margin-bottom in headerTextProperties
    const fontSize = this.getFontSize(SUBHEADER_OFFSET);
    const fontWeight = 200;
    return `
      margin-top: ${-1 * this.headerMargin}px;
      margin-bottom: ${this.headerMargin}px;
      text-transform: uppercase;
      letter-spacing: 1px;
      ${FONT_FAMILY}
      font-size: ${fontSize}px;
      text-align: ${this.isInPanel ? 'left' : 'center'};
      font-weight: ${fontWeight};
      color: ${this.colorPalette.utilityTextGrays[5].toHex8String()};
    `;
  }

  getComponentPadding(offset: number): number {
    const { sectionDepth, panelDepth } = this.state;
    return COMPONENT_PADDINGS[offset + sectionDepth + (2 * panelDepth)];
  }

  get sectionProperties(): string {
    const bottomMargin = this.getComponentPadding(3);
    const bottomMarginDesktop = this.getComponentPadding(1);
    return `
      margin-bottom: ${bottomMargin}px;
      &:last-child {
        margin-bottom: 0;
      }
      text-align: ${this.state.sectionAlignment};
      @media ${getMediaQuery('DESKTOP')} {
        margin-bottom: ${bottomMarginDesktop}px;
      }
    `;
  }

  getButtonProperties(isPrimary: boolean): string {
    // TODO: fold more CSS properties from button group into this
    const fgColor = isPrimary
      ? this.colorPalette.actionColorContrast
      : this.colorPalette.actionColor;
    const bgColor = isPrimary
      ? this.colorPalette.actionColor
      : this.colorPalette.actionColorContrast;
    const borderColor = this.colorPalette.actionColor;
    const borderSize = this.state.panelDepth ? '1px' : '3px';
    const fontSize = this.getFontSize(PARAGRAPH_OFFSET);
    const padding = 10;
    const boxShadow = this.getBoxShadowFromColor(
      this.colorPalette.actionColorShadowColor
    );

    const hoverBoxShadow = this.getBoxShadowFromColor(
      this.colorPalette.actionColorShadowColor,
      0,
      3,
      5
    );
    const hoverMovementBehavior = `&:hover {
      transform: translateY(-2px);
      box-shadow: ${hoverBoxShadow};
    }`;
    const actualHoverMovementBehavior = this.state.inButtonGroup
      ? `@media ${getMediaQuery('DESKTOP')} { ${hoverMovementBehavior} }`
      : hoverMovementBehavior;

    return `
      color: ${fgColor};
      background-color: ${bgColor};
      border: ${borderSize} solid ${borderColor.toHex8String()};
      box-shadow: ${boxShadow};
      transform: none;
      transition: ${this.getTransition('transform', 100)};
      font-size: ${fontSize}px;
      padding: ${padding}px;
      ${FONT_FAMILY}
      cursor: pointer;
      text-decoration: none;
      text-align: center;
      border-radius: ${this.buttonBorderRadius}px;
      display: inline-block;
      ${actualHoverMovementBehavior}
    `;
  }

  // eslint-disable-next-line class-methods-use-this
  get buttonBorderRadius(): number {
    return 4;
  }

  get buttonGroupStyles(): string {
    const { panelDepth, sectionDepth } = this.state;
    const padding = 36 - (sectionDepth * 4) - (panelDepth * 8);
    const borderRadius = this.buttonBorderRadius;
    return `
      margin: ${padding * 2}px 0;
      & > * {
        width: 100%;
        box-sizing: border-box;
        display: block;

        border-radius: 0px;
        &:first-child {
          border-top-right-radius: ${borderRadius}px;
          border-top-left-radius: ${borderRadius}px;
        }

        &:last-child {
          border-bottom-right-radius: ${borderRadius}px;
          border-bottom-left-radius: ${borderRadius}px;
        }

        @media ${getMediaQuery('TABLET')} {
          width: auto;
          min-width: 300px;
          display: inline-block;
          margin-right: ${padding}px;
          margin-left: ${padding}px;
          &:first-child {
            margin-left: 0;
          }
          &:last-child {
            margin-right: 0;
          }
        }
      }
    `;
  }
}
