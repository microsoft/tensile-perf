// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import * as React from 'react';

export const onRenderLog: React.ProfilerOnRenderCallback = (
  profilerId,
  mode,
  actualTime,
  baseTime,
  startTime,
  commitTime,
) => {
  console.log({ profilerId, mode, actualTime, baseTime, startTime, commitTime });
};
