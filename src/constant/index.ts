import { BN } from '@project-serum/anchor'

export enum FarmId {
  Sentre = 'sentre',
  Staked = 'staked',
  Your = 'your',
  All = 'all',
}

export const FARM_OPTION: Record<string, string> = {
  all: 'All',
  sentre: 'Sentre farm',
  staked: 'Staked farm',
  your: 'Your farm',
}

export const DATE_FORMAT = 'MMM DD, YYYY HH:mm'

export const PRECISION = new BN(10 ** 9)
