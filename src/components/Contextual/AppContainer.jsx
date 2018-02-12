// @flow
import React, { type Node } from 'react';
import styled from 'styled-components';
import { EnterAppContainer } from './Updaters';

type AppContainerProps = {
  children: Node,
}

// TODO get top margin from context?
const Container = styled.div`
  width: 100%;
  max-width: 970px;
  margin: 80px auto 0;
`;

export default ({ children }: AppContainerProps) => (<EnterAppContainer>
  <Container>
    { children }
  </Container>
</EnterAppContainer>);
