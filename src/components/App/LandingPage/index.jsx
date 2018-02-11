import React from 'react';

import Panel from 'src/components/Contextual/Panel';
import Header from 'src/components/Contextual/Header';
import Subheader from 'src/components/Contextual/Subheader';

export default () => (<div>
  <Header>Chameleon JS</Header>
  <Subheader>Never mix styles and business logic again!</Subheader>
  <Panel>
    <Header>Chameleon JS</Header>
    <Subheader>Never mix styles and business logic again!</Subheader>
  </Panel>
</div>);
