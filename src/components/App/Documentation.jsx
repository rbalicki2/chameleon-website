import React, { Fragment } from 'react';

import Header from 'src/components/Contextual/Header';
import Subheader from 'src/components/Contextual/Subheader';
import Jumbotron from 'src/components/Contextual/Jumbotron';
import Section from 'src/components/Contextual/Section';
import Paragraph from 'src/components/Contextual/Paragraph';
import Panel from 'src/components/Contextual/Panel';

import CodeSnippet from './CodeSnippet';

export default () => (<Fragment>
  <Jumbotron>
    <Header>Documentation v0.2.0</Header>
    <Subheader>Chameleon is pre 1.0. Changes are planned.</Subheader>
  </Jumbotron>
  <Section>
    <Header>Core API</Header>
    <Section>
      <Panel>
        <Section>
          <Header><code>makeContextComponents</code></Header>
          <Subheader>
            <code>
              import {'{'} makeContextComponents {'}'} from &apos;chameleon&apos;
            </code>
          </Subheader>
          <Paragraph>
            <code>makeContextComponents(contextReducer, initialContext)</code> is a function
            which takes a reducer and an initial context,
            and returns <code>{'{'} UpdateContext, ContextProvider {'}'}</code>.
          </Paragraph>
        </Section>
        <Section>
          <Header><code>functionReducer</code></Header>
          <Subheader>
            <code>
              import {'{'} functionReducer {'}'} from &apos;chameleon/lib/reducers&apos;;
            </code>
          </Subheader>
          <Paragraph>
            <code>functionReducer</code> is the recommended reducer. If
            a <code>functionReducer</code> is passed
            to <code>makeContextComponents</code>, then <code>UpdateContext</code> has
            the following API:
          </Paragraph>
          <CodeSnippet
            code={'<UpdateContext call={someFunctionReturningANewContext} />'}
          />
        </Section>
        <Section>
          <Header><code>UpdateContext</code></Header>
          <Paragraph>
            The props passed to <code>UpdateContext</code> are passed to the reducer
            that we used in <code>makeContextComponent</code>. The return value of the reducer
            becomes the context that is passed to the children.
          </Paragraph>
          <CodeSnippet
            code={`
              // if this is our reducer
              let functionReducer = (oldContext, { call }) => call(oldContext);

              // this is how we use UpdateContext
              <UpdateContext call={context => context.update({ foo: 'bar' })}>
                <ContextProvider>{context =>
                  // will render 'bar'
                  context.foo
                }</ContextProvider>
              </UpdateContext>
            `}
          />
        </Section>
        <Section>
          <Header><code>ContextProvider</code></Header>
          <Paragraph>
            A render prop component that exposes the current context.
          </Paragraph>
        </Section>
      </Panel>
    </Section>
  </Section>
  <Section>
    <Header>Best Practices</Header>
    <Section>
      <Panel>
        <Section>
          <Header>Use a class for <code>styleContext</code></Header>
          <Paragraph>
            Use a class for <code>styleContext</code>. On it, expose:
          </Paragraph>
          <Paragraph>
            <ul>
              <li>
                an <code>update</code> method, which returns a <strong>new, modified
                instance</strong> of the <code>styleContext</code>.
              </li>
              <li>
                setters, e.g. <code>enterSection()</code>, which wrap calls
                to <code>update</code> and which have easy-to-understand names that
                correspond to the component which will call them.
              </li>
              <li>
                getters, e.g. <code>get sectionStyles()</code>, which return the styles as a string.
              </li>
            </ul>
          </Paragraph>
        </Section>
        <Section>
          <Header>use styled components to turn those styles into components</Header>
          <CodeSnippet
            code={`
              // Example
              const Paragraph = styled.div\`
                \${({ context }) => \`
                  \${context.paragraphProperties}
                \`}
              \`;

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
            `}
          />
        </Section>
      </Panel>
    </Section>
  </Section>
  <Section>
    <Header>Roadmap</Header>
    <Section>
      <Panel>
        <Section>
          <Paragraph>
            <ul>
              <li>export a base <code>StyleContext</code> class</li>
              <li>get rid of some not-useful functionality</li>
              <li>
                a decorator, which will turn a function which takes a context and returns a string
                (e.g. <code>get paragraphProperties()</code> above) into a styled component.
              </li>
              <li>
                Use the new context API (this uses the legacy one), allowing us to remove
                our dependency on <code>prop-types</code>.
              </li>
            </ul>
          </Paragraph>
        </Section>
      </Panel>
    </Section>
  </Section>
</Fragment>);
