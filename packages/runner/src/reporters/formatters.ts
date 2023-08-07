// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

export const decimalFormatter = (value: number): number => {
    return Math.round(value * 100) / 100;
};

export const roundFormatter = (value: number): number => {
    return Math.round(value);
};
