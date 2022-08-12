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
    senFarmingProgram: '',
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    senFarmingProgram: '',
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    senFarmingProgram: '',
  },
}

/**
 * Module exports
 */
export default conf
