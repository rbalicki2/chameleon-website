// @flow
// import { Component } from 'react';
import { makeContextComponents } from 'chameleon';
import contextReducer from './contextReducer';
import initialContext from './initialContext';
import { type ActionType } from './Action';

type HasType = {
  type: ActionType,
};

// TODO get flow working here
type MakeContextComponents = {
  UpdateContext: any, // Component<any>,
  ContextProvider: any, // Component<any>,
  updateContextGenerator: (HasType) => any,
  // propertyComponentGenerator
}

const contextComponents: MakeContextComponents = makeContextComponents(
  contextReducer,
  initialContext
);
const {
  UpdateContext,
  ContextProvider,
  updateContextGenerator,
  // propertyComponentGenerator,
} = contextComponents;

export {
  UpdateContext,
  ContextProvider,
  updateContextGenerator,
  // propertyComponentGenerator,
};
