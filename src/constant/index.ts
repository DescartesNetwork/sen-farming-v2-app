import { BN } from '@project-serum/anchor'

export enum FarmId {
  Sentre = 'sentre',
  Staked = 'staked',
  Your = 'your',
  All = 'all',
}

export const FARM_OPTION: Record<string, string> = {
  all: 'All',
  staked: 'Staked farms',
  your: 'Your farms',
  expired: 'Expired farms',
}

export enum FarmTab {
  All = 'all',
  Staked = 'staked farms',
  Your = 'your farms',
  Expired = 'expired farms',
}

export const DATE_FORMAT = 'MMM DD, YYYY HH:mm'

export const PRECISION = new BN(10 ** 9)
