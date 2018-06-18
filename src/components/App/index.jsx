// @flow
import React, { Fragment } from 'react';
import styled from 'styled-components';
import Routes from './Routes';

const AppContainer = styled.div`
  width: 100%;
  max-width: 970px;
  margin: 80px auto 80px;
  transition: all 400ms linear;
`;

export default () => (<Fragment>
  <AppContainer>
    <Routes />
  </AppContainer>
</Fragment>);
