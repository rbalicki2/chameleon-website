// @flow
import { makeContextComponents } from 'chameleon';
import contextReducer from './contextReducer';
import initialContext from './initialContext';

const {
  UpdateContext,
  ContextProvider,
  updateContextGenerator,
  propertyComponentGenerator,
} = makeContextComponents(contextReducer, initialContext);

export {
  UpdateContext,
  ContextProvider,
  updateContextGenerator,
  propertyComponentGenerator,
};
