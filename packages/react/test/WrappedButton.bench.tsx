import * as React from 'react';
import { useTestContext, tests } from './wrappedTests';

const itemRenderer: React.FC = () => {
  const ctx = useTestContext();
  return <button>{ctx?.label ?? 'Default React button'}</button>;
};

export default itemRenderer;

export { tests };