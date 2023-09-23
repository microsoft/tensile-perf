// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { renderAddTest } from './testAdd.js';
import { renderMountTest } from './testMount.js';
import { renderRemoveTest } from './testRemove.js';
import type { TestMap } from '../types.js';

export const tests: TestMap = {
  'mount': renderMountTest,
  'add': renderAddTest,
  'remove': renderRemoveTest,
}