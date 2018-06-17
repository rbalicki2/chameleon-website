// @flow
import * as React from 'react';
import { makeContextComponents, reducers } from 'chameleon';
import initialContext from './initialContext';
import type StyleContext from './StyleContext';

type UpdateContextProps = {
  call: StyleContext => StyleContext,
};

type ContextProviderProps = {
  children: StyleContext => any,
}

// TODO get flow working here
type MakeContextComponents = {
  UpdateContext: React.ComponentType<UpdateContextProps>,
  ContextProvider: React.ComponentType<ContextProviderProps>,
}

const contextComponents: MakeContextComponents = makeContextComponents(
  reducers.functionReducer,
  initialContext
);
const {
  UpdateContext,
  ContextProvider,
} = contextComponents;

export {
  UpdateContext,
  ContextProvider,
};
