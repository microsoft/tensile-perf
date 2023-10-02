// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomBackgroundColors } from "./randomBackgroundColors.js";
import type { RandomCssFromSelectorsParams } from "../types.js";

export const injectStyles = (params: RandomCssFromSelectorsParams): void => {
    const css = randomBackgroundColors(params);

    const styleTag = document.createElement('style');
    styleTag.textContent = css;

    document.head.appendChild(styleTag);
};