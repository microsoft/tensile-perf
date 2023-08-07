// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { randomBackgroundColors } from "./randomBackgroundColors";
import type { RandomCssFromSelectorsParams } from "../types";

export const injectStyles = (params: RandomCssFromSelectorsParams): void => {
    const css = randomBackgroundColors(params);

    const styleTag = document.createElement('style');
    styleTag.textContent = css;

    document.head.appendChild(styleTag);
};