// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';
import { TestRendererProvider } from '../context/TestRendererContext.js';

export type TestAppProps<T> = {
  renderers?: Map<string, T>;
}

export const TestApp: React.FC<TestAppProps<unknown>> = (props) => {
  return <TestRendererProvider {...props}/>;
}