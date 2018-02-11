// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { EnterSection } from './Updaters';
import { ContextProvider } from './StyleContext';

const Section = styled.div`
  ${({ context }) => `
    ${context.sectionMargins}
  `}
`;

type SectionProps = {|
  children: Node,
|};

export default ({
  children,
}: SectionProps) => (
  <EnterSection>
    <ContextProvider>{context =>
      (<Section context={context}>
        { children }
      </Section>)
    }</ContextProvider>
  </EnterSection>
);
