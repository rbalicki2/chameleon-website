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
    <Header>Write Once, Style Everywhere</Header>
    <Subheader>Your Components Will Style Themselves</Subheader>
    Some code example
  </Section>
  <Section>
    <Header>Chameleon JS is Modular</Header>
    <Subheader>Separate your concerns</Subheader>
    Talk about reducers
  </Section>
  <Section>
    <Header>Chameleon JS is Hot</Header>
    <Subheader>It uses advanced React</Subheader>
  </Section>
</Fragment>);
