// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { renderAddTest } from "./TestAdd.js";
// import { renderInvalidateTest } from "./TestInvalidate";
import { renderMountTest } from "./TestMount.js";
import { renderRemoveTest } from "./TestRemove.js";
import type { TestMap } from "../types.js";

export const tests: TestMap = {
  'add': renderAddTest,
  // 'invalidate': renderInvalidateTest,
  'mount': renderMountTest,
  'remove': renderRemoveTest,
};

export { TestApp } from './TestApp.js';
