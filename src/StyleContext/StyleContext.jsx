// @flow

export type InternalState = {
  sectionDepth: number,
};

export default class StyleContext {
  context: InternalState;
  constructor(context: InternalState) {
    this.context = context;
  }

  incrementSectionDepth() {
    return new StyleContext({
      ...this.context,
      sectionDepth: this.context.sectionDepth + 1,
    });
  }
}
