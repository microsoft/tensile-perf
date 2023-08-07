// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

import { getRandomUtil } from "../random/random";
import { colorNames, cssRgbaColor } from "./color";
import type { CssNamedColor, RandomCssFromSelectorsParams } from "../types";

export const randomBackgroundColors: (params: RandomCssFromSelectorsParams) => string = ({ selectors, seed }) => {
    const { choice } = getRandomUtil(seed);
    
    let css = '';
    
    selectors.forEach(selector => {
      const backgroundColor = cssRgbaColor(choice(colorNames) as CssNamedColor, 0.25);
      css += `${selector} { background-color: ${backgroundColor}; transition-duration: 0ms; }\n`;
    });
  
    return css;
};