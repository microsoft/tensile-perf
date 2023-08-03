import { renderAddTest } from './testAdd';
import { renderMountTest } from './testMount';
import { renderRemoveTest } from './testRemove';
import type { TestMap } from '../types';

export const tests: TestMap = {
  'mount': renderMountTest,
  'add': renderAddTest,
  'remove': renderRemoveTest,
}