import { BN } from '@project-serum/anchor'

export enum FarmId {
  Sentre = 'sentre',
  Staked = 'staked',
  Your = 'your',
  All = 'all',
}

export enum FarmTab {
  All = 'All',
  Staked = 'Staked farms',
  Your = 'Your farms',
  Finished = 'Finished farms',
}

export const DATE_FORMAT = 'MMM DD, YYYY HH:mm'

export const PRECISION = new BN(10 ** 9)
