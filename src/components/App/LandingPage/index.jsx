import React, { Fragment } from 'react';

import Header from 'src/components/Contextual/Header';
import Subheader from 'src/components/Contextual/Subheader';
import Jumbotron from 'src/components/Contextual/Jumbotron';
import Section from 'src/components/Contextual/Section';
import Button from 'src/components/Contextual/Button';
import ButtonGroup from 'src/components/Contextual/ButtonGroup';

export default () => (<Fragment>
  <Jumbotron>
    <Header>Chameleon JS</Header>
    <Subheader>Write components that style themselves</Subheader>
    <ButtonGroup>
      <Button primary style={{ width: 220 }}>Documentation</Button>
      <Button href="https://github.com/rbalicki2/chameleon" style={{ width: 220 }}>Github</Button>
    </ButtonGroup>
  </Jumbotron>
  <Section>
    <Header>Write less code</Header>
    <Subheader>No more styling information in your views</Subheader>
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
