// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import { ContextProvider } from './StyleContext';

const Paragraph = styled.div`
  ${({ context }) => `
    ${context.paragraphProperties}
  `}
`;

type ParagraphProps = {|
  children: Node,
|};

export default ({
  children,
}: ParagraphProps) => (
  <ContextProvider>{context =>
    (<Paragraph context={context}>
      { children }
    </Paragraph>)
  }</ContextProvider>
);
