import React from 'react';
import { makeContextComponents } from 'chameleon';

import styled from 'styled-components';

class StyleContext {
  constructor(context) {
    this.context = context;
  }

  get foregroundStyleFromMode() {
    return ({
      NIGHT: `
        color: green;
        &:hover {
          color: gold; 
        }
      `,
      DAY: `
        color: blue;
        &:hover {
          color: cyan;
        }
      `,
    })[this.context.mode];
  }

  get headingStyleFromSectionDepth() {
    return `
      font-size: ${40 - 5 * this.context.sectionDepth}px;
      line-height: 1em;
      font-weight: ${800 - 100 * this.context.sectionDepth};
      margin-bottom: ${20 - 2 * this.context.sectionDepth}px;
    `;
  }

  get Header() {
    return styled.div`
      ${this.foregroundStyleFromMode}
      ${this.headingStyleFromSectionDepth}
    `;
  }

  incrementSectionDepth() {
    return new StyleContext({
      ...this.context,
      sectionDepth: this.context.sectionDepth + 1,
    });
  }

  setMode(mode) {
    return new StyleContext({
      ...this.context,
      mode,
    });
  }
}

const initialContext = new StyleContext({
  mode: 'DAY',
  sectionDepth: 0,
});

const contextReducer = (previousContext, action) => {
  switch (action.type) {
    case 'INCREMENT_SECTION_DEPTH':
      return previousContext.incrementSectionDepth();
    case 'SET_MODE':
      return previousContext.setMode(action.mode);
    default:
      throw new Error('unhandled type');
  }
}

const {
  updateContextGenerator,
  propertyComponentGenerator,
} = makeContextComponents(contextReducer, initialContext);

const Header = propertyComponentGenerator(x => x.Header);
const IncrementSectionDepth = updateContextGenerator({ type: 'INCREMENT_SECTION_DEPTH' });
const NightMode = updateContextGenerator({ type: 'SET_MODE', mode: 'NIGHT' });
const DayMode = updateContextGenerator({ type: 'SET_MODE', mode: 'DAY' });
const SetMode = updateContextGenerator({ type: 'SET_MODE' });

export default () => (<div>
  <Header>Global header is the biggest</Header>
  <hr />
  <IncrementSectionDepth>
    <Header>Sub header</Header>
    <IncrementSectionDepth>
      <NightMode>
        <Header>Night mode header!</Header>
        <DayMode><Header>AND BACK TO DAY MODE</Header></DayMode>
        <SetMode mode="DAY"><Header>back to day 2</Header></SetMode>
      </NightMode>
    </IncrementSectionDepth>
  </IncrementSectionDepth>
</div>);
