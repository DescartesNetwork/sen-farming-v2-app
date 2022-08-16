import { Net, rpc } from '@sentre/senhub'
import metaplexNFT from 'lib/metaplex'
/**
 * Contructor
 */
type Conf = {
  node: string
  senFarmingProgram: string
  metaplexNFT: metaplexNFT
}

const conf: Record<Net, Conf> = {
  /**
   * Development configurations
   */
  devnet: {
    node: 'https://api.devnet.solana.com',
    senFarmingProgram: '6LaxnmWdYUAJvBJ4a1R8rrsvCRtaY7b43zKiNAU2k3Nx',
    metaplexNFT: new metaplexNFT(rpc),
  },

  /**
   * Staging configurations
   */
  testnet: {
    node: 'https://api.testnet.solana.com',
    senFarmingProgram: '6LaxnmWdYUAJvBJ4a1R8rrsvCRtaY7b43zKiNAU2k3Nx',
    metaplexNFT: new metaplexNFT(rpc),
  },

  /**
   * Production configurations
   */
  mainnet: {
    node: 'https://api.mainnet-beta.solana.com',
    senFarmingProgram: 'E6Vc9wipgm8fMXHEYwgN7gYdDbyvpPBUiTNy67zPKuF4',
    metaplexNFT: new metaplexNFT(rpc),
  },
}

/**
 * Module exports
 */
export default conf
