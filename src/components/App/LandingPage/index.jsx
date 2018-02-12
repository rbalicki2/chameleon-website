import React, { Fragment } from 'react';

import Header from 'src/components/Contextual/Header';
import Subheader from 'src/components/Contextual/Subheader';
import Jumbotron from 'src/components/Contextual/Jumbotron';
import Section from 'src/components/Contextual/Section';
import Button from 'src/components/Contextual/Button';
import ButtonGroup from 'src/components/Contextual/ButtonGroup';
import Grid from 'src/components/Contextual/Grid';
import GridItem from 'src/components/Contextual/GridItem';
import Paragraph from 'src/components/Contextual/Paragraph';

const writeLessCodeGridProps = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'stretch',
};

export default () => (<Fragment>
  <Jumbotron>
    <Header>Chameleon JS</Header>
    <Subheader>Components that style themselves</Subheader>
    <Paragraph>
      When you write components that style themselves, your views
      are <em>semantic</em>, <em>easy-to-read</em> and <em>contain
      only business logic</em>!
    </Paragraph>
    <Paragraph>
      Don&apos;t believe me? Check out the <a
        href="https://github.com/rbalicki2/chameleon-website/blob/master/src/components/App/LandingPage/index.jsx"
      >source code for this page</a>.
    </Paragraph>
    <ButtonGroup>
      <Button primary style={{ width: 220 }}>Documentation</Button>
      <Button href="https://github.com/rbalicki2/chameleon" style={{ width: 220 }}>Github</Button>
    </ButtonGroup>
  </Jumbotron>
  <Section>
    <Header>Write less code</Header>
    <Subheader>No more styling information in your views</Subheader>
    <Section>
      <Grid gridType="FLEXBOX" flexContainerProperties={writeLessCodeGridProps}>
        <GridItem>
          <Paragraph>ASDF</Paragraph>
        </GridItem>
        <GridItem>2</GridItem>
      </Grid>
    </Section>
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
