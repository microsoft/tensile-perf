import { LCG } from 'random-seedable';
import type { RandomUtilGetter } from '../types';

export const DEFAULT_SEED = 4212021;

export const getRandomNumberGenerator = (seed: number = DEFAULT_SEED) => { 
  // eslint-disable-next-line
  // @ts-ignore
  return new LCG(seed);
};

export const getRandomUtil: RandomUtilGetter = (seed: number = DEFAULT_SEED) => {
  const rando = getRandomNumberGenerator(seed);

  return {
    coin: (pTrue = 0.5) => rando.coin(pTrue),
    choice: choices => rando.choice(choices),
    range: (min, max) => rando.randRange(min, max),
    integer: () => rando.int(),
  };
};
