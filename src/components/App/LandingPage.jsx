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

import CodeSnippet from './CodeSnippet';

const gridProps = {
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'stretch',
};

const gridItemProps = {
  flex: '1 0 50%',
};

export default () => (<Fragment>
  <Jumbotron>
    <Header>Chameleon JS</Header>
    <Subheader>Build components that style themselves</Subheader>
    <Paragraph>
      When you write components that style themselves, your views
      are <em>semantic</em>, <em>easy-to-read</em> and <em>contain
      only business logic</em>!
    </Paragraph>
    <Paragraph>
      Don&apos;t believe me? Check out the <a
        href="https://github.com/rbalicki2/chameleon-website/blob/master/src/components/App/LandingPage.jsx"
      >source code for this page</a>.
    </Paragraph>
    <ButtonGroup>
      <Button to="/docs" primary>Documentation</Button>
      <Button href="https://github.com/rbalicki2/chameleon">Github</Button>
    </ButtonGroup>
  </Jumbotron>
  <Section>
    <Header>Write Less Code</Header>
    <Subheader>No more styling information in your views</Subheader>
    <Section>
      <Panel>
        <Grid gridType="FLEXBOX" flexContainerProperties={gridProps}>
          <GridItem gridItemProperties={gridItemProps} style={{ minWidth: 400 }}>
            <Paragraph>
              Chameleon JS is a toolkit for building components that style themselves.
              Each component receives information using React&apos;s context. Using
              this information, a component can dynamically calculate its style.
            </Paragraph>
            <Paragraph>
              This means that the code that when writing views, you don&apos;t write any
              styles. You only write <strong>semantic</strong> information
              and <strong>business logic</strong>.
            </Paragraph>
            <Paragraph>
              The resulting views could never have been simpler. But more importantly, now they
              are also <em>portable</em>. Copy-and-paste the same code into another file,
              and <em>it just works</em>.
            </Paragraph>
          </GridItem>
          <GridItem gridItemProperties={gridItemProps} style={{ minWidth: 400 }}>
            <Paragraph>
              The following renders correctly, anywhere. No need to specify parameters
              like <code>size=&quot;small&quot;</code> or to pass hard-to-maintain style objects.
              Copy and paste it into a <code>&lt;Panel&gt;</code> component, and it
              continues to render appropriately!
            </Paragraph>
            <CodeSnippet
              code={`
              <Header>This header will render with a large font size</Header>
              <Subheader>As will this subheader</Subheader>
              <Section>
                <Header>You can copy these components</Header>
                <Subheader>Directly into a Section</Subheader>
              </Section>
              <Panel>
                <Header>Or into a Panel, or anywhere else, really,</Header>
                <Subheader>And it will just work!</Subheader>
                <Paragraph>(And be styled correctly)</Paragraph>
              </Panel>
              `}
            />
          </GridItem>
        </Grid>
      </Panel>
    </Section>
  </Section>
  <Section>
    <Header>Chameleon JS is a Tool</Header>
    <Subheader>Build whatever you want</Subheader>
    <Panel>
      <Section>
        <Paragraph>
          Chameleon JS is a set of patterns and tools for building components
          which style themselves. It is <strong>not</strong> the set of components themselves.
        </Paragraph>
        <Paragraph>
          This website was built with a set of components which may one day be extracted
          into their own library. For now, they are a proof of concept. You can <a
            href="https://github.com/rbalicki2/chameleon-website/blob/master/src/components/Contextual"
          >view the source code</a> to look at how these components were constructed.
        </Paragraph>
        <Paragraph>
          Take a look at the patterns that constitute Chameleon JS.
        </Paragraph>
      </Section>
      <Section>
        <Header>Context Class</Header>
        <Paragraph>
        https://docs.google.com/presentation/d/16yfl7YsyovjsG1rzX4WaxeUeWeIL5I93JS232Iy3Pq0/edit?usp=sharing
          There is a context class from which all styles are derived. It stores state
          and exposes an update method, which must return a <b>new instance</b> of the
          context. In addition, it exposes methods that return the style for various
          components, depending on the context state.
        </Paragraph>
        <Paragraph>
          (Alternatively, you can use a plain ol&apos; Javascript object.)
        </Paragraph>
        <CodeSnippet
          code={`
            class StyleContext {
              constructor(state) {
                this.state = state || {
                  sectionDepth: 0,
                };
              }

              update(newState) {
                return new StyleContext({
                  ...this.state,
                  ...newState,
                })
              }

              get sectionStyle() {
                // A section's font size decreases by 5px for each nested section!
                return \`
                  font-size: \${30 - this.state.sectionDepth * 5};
                \`;
              }
            }
          `}
        />
      </Section>
      <Section>
        <Header>Context Reducers</Header>
        <Paragraph>
          Reducers are a function from one context to a new context.
        </Paragraph>
        <CodeSnippet
          code={`
            // The most common reducer calls a function that you pass in.
            functionReducer = (previousContext, { update }) => update(previousContext);
            // it is exported as reducers.functionReducer from chameleon.
          `}
        />
      </Section>
      <Section>
        <Header>Context Updater Components</Header>
        <Paragraph>
          Wrap updates to the context in context updater components.
        </Paragraph>
        <CodeSnippet
          code={`
            const EnterSection = ({ children }) => (<UpdateContext
              call={context => context.update({ sectionDepth: context.sectionDepth + 1 })}
            >
              {children}
            </UpdateContext>);
          `}
        />
      </Section>
      <Section>
        <Header>Create Components That Derive Styles From Context</Header>
        <CodeSnippet
          code={`
            const StyledSection = styled.div\`
              \${({ context }) => context.sectionStyle}
            \`;
          `}
        />
      </Section>
      <Section>
        <Header>Combine These Components</Header>
        <Subheader>Better together</Subheader>
        <Paragraph>
          Many components both update the context and render DOM, such as sections,
          panels, etc. In the previous example,
          the <code>EnterSection</code> and <code>StyledSection</code> components
          should be combined into a single <code>Section</code> component.
        </Paragraph>
        <CodeSnippet
          code={`
            const Section = ({ children }) => (<EnterSection>
              <StyledSection>
                { children }
              </StyledSection>
            </EnterSection>);
          `}
        />
      </Section>
    </Panel>
  </Section>
  <Section>
    <Header>Many Uses of Chameleon JS</Header>
    <Subheader>Think of the possibilities</Subheader>
    <Panel>
      <Section>
        <Header>More Precise Styles</Header>
        <Paragraph>
          This website (having very little interactivity) is but the tip of the iceberg for what
          can be done with Chameleon. My hope is to enable some designer out there to build
          something more intricate, and yet keep it easy to implement by a web developer.
        </Paragraph>
      </Section>
      <Section>
        <Header>Enabling/disabling sections of the app</Header>
        <Paragraph>
          <code>styleContext</code> can be used to control the <code>pointer-events</code> CSS
          property. Disable entire sections of the app if they are obscured by a modal!
        </Paragraph>
      </Section>
      <Section>
        <Header>Easy Form Styles</Header>
        <Paragraph>
          Passing down whether a particular field on a form is in an error state can be tricky
          and painful to get right. Use Chameleon to make form inputs that know how to style
          themselves based on whether the context indicates that that section of the form is
          in an error state.
        </Paragraph>
      </Section>
      <Section>
        <Header>Enforce Invariants</Header>
        <Paragraph>
          If your <code>styleContext</code> throws errors when it enters an invalid state, you
          can prevent your developers from doing silly things, like using a <code>Col</code> outside
          of a <code>Row</code>, or a <code>GridItem</code> outside of a <code>Grid</code>.
          Combine this with build-time server-side rendering and you won&apos;t even be able to
          deploy your app in a broken state!
        </Paragraph>
      </Section>
    </Panel>
  </Section>
  <Section>
    <Header>Legal, etc.</Header>
    <Panel>
      <Section>
        <Header>License</Header>
        <Paragraph>
          Chameleon is licensed under the MIT license.
        </Paragraph>
      </Section>
    </Panel>
  </Section>
</Fragment>);
