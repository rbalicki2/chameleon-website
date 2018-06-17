// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';

import getMediaQuery from './StyleContext/getMediaQuery';
import { UpdateContext } from './StyleContext';

// TODO use EnterJumbotron component to ensure we're not contained
// in a section.
const Jumbotron = styled.div`
  text-align: center;
  margin: 60px 0;
  @media ${getMediaQuery('DESKTOP')} {
    margin: 160px 0;
  }
`;

type JumbotronProps = {|
  children: Node,
|};

export default ({
  children,
}: JumbotronProps) => (
  <UpdateContext call={context => context.enterJumbotron()}>
    <Jumbotron>
      { children }
    </Jumbotron>
  </UpdateContext>
);
