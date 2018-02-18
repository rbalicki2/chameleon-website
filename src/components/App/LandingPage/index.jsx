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
import Panel from 'src/components/Contextual/Panel';

const writeLessCodeGridProps = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'stretch',
};

const writeLessCodeGridItemProps = {
  flex: 1,
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
      <Button primary>Documentation</Button>
      <Button href="https://github.com/rbalicki2/chameleon">Github</Button>
    </ButtonGroup>
  </Jumbotron>
  <Section>
    <Header>Write less code</Header>
    <Subheader>No more styling information in your views</Subheader>
    <Section>
      <Grid gridType="FLEXBOX" flexContainerProperties={writeLessCodeGridProps}>
        <GridItem gridItemProperties={writeLessCodeGridItemProps} style={{ width: '50%' }}>
          <Panel>
            <Paragraph>
              Chameleon JS is a toolkit for building components that style themselves.
              Each component is aware of where it is (for example, within
              a <code>&lt;Panel&gt;</code>). Using
              this information, a component can dynamically calculate it&apos;s style.
            </Paragraph>
            <Paragraph>
              This means that the code that when writing views, you don&apos;t write any
              styles! You only write <strong>semantic</strong> information (which specifies
              the role that the component plays, such as <code>&lt;Paragraph&gt;</code>)
              and <strong>business logic</strong>!
            </Paragraph>
            <Paragraph>
              These views could never have been simpler. But more importantly, now they
              are also <em>portable</em>! Copy-and-paste the same code into another file,
              and <em>it just works</em>.
            </Paragraph>
          </Panel>
        </GridItem>
        <GridItem gridItemProperties={writeLessCodeGridItemProps}>2</GridItem>
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
