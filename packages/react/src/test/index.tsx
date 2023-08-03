import { renderAddTest } from "./TestAdd";
// import { renderInvalidateTest } from "./TestInvalidate";
import { renderMountTest } from "./TestMount";
import { renderRemoveTest } from "./TestRemove";
import type { TestMap } from "../types";

export const tests: TestMap = {
  'add': renderAddTest,
  // 'invalidate': renderInvalidateTest,
  'mount': renderMountTest,
  'remove': renderRemoveTest,
};

export { TestApp } from './TestApp';
