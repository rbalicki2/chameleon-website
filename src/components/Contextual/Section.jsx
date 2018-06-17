// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider, UpdateContext } from './StyleContext';

const Section = styled.div`
  ${({ context }) => context.sectionProperties}
`;

type SectionProps = {|
  children: Node,
  depth: number,
|};

const SectionComponent = ({
  children,
  depth,
}: SectionProps) => (
  <UpdateContext call={context => context.enterSection(depth)}>
    <ContextProvider>{context =>
      (<Section context={context}>
        { children }
      </Section>)
    }</ContextProvider>
  </UpdateContext>
);

SectionComponent.defaultProps = {
  depth: 1,
};

export default SectionComponent;
