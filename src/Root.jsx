import React from 'react';

import { ContextProvider, UpdateContext } from './StyleContext';

export default () => (<div>
  <ContextProvider>{context =>
    (<div>
      { context.context.sectionDepth }
      <UpdateContext type="INCREMENT_SECTION_DEPTH">
        <ContextProvider>{innerContext =>
          innerContext.context.sectionDepth
        }</ContextProvider>
      </UpdateContext>
    </div>)
  }</ContextProvider>
</div>);
