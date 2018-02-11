import React, { Fragment } from 'react';

import Header from 'src/components/Contextual/Header';
import Subheader from 'src/components/Contextual/Subheader';
import Jumbotron from 'src/components/Contextual/Jumbotron';
import Section from 'src/components/Contextual/Section';

export default () => (<Fragment>
  <Jumbotron>
    <Header>Chameleon JS</Header>
    <Subheader>Never mix styles and business logic again!</Subheader>
  </Jumbotron>
  <Section>
    <Header>Chameleon JS</Header>
    <Subheader>Never byah!</Subheader>
  </Section>
</Fragment>);
