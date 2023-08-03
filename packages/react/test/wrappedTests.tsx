import * as React from 'react';
import { TestApp, tests } from '@stress-test/react';
import type { TestRenderParams } from '@stress-test/react';

export type TestContextValue = {
  label: string;
}

const TestContext = React.createContext<TestContextValue | undefined>(undefined);

export const useTestContext = () => {
  return React.useContext(TestContext);
}

const FluentTestApp: React.FC = ({ children }) => {
  return (
    <TestContext.Provider value={{ label: "Wrapped React button" }}>
      <TestApp>{children}</TestApp>
    </TestContext.Provider>
  );
};

const wrappedTests = {};

for (const testName of Object.keys(tests)) {
  const test = tests[testName];

  wrappedTests[testName] = (params: Omit<TestRenderParams, 'TestWrapper'>) => {
    return test({ ...params, TestWrapper: FluentTestApp });
  }
};

export { wrappedTests as tests }


