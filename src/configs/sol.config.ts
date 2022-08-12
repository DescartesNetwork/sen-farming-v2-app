import { Net } from '@sentre/senhub'

/**
 * Contructor
 */
type Conf = {
  node: string
  senFarmingProgram: string
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    senFarmingProgram: '4fPn4MWiAdAWd5vqjRnCxqEsFJgWoK3mim21G82ZHPD3',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    senFarmingProgram: '4fPn4MWiAdAWd5vqjRnCxqEsFJgWoK3mim21G82ZHPD3',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    senFarmingProgram: '4fPn4MWiAdAWd5vqjRnCxqEsFJgWoK3mim21G82ZHPD3',
  },
}

/**
 * Module exports
 */
export default conf
