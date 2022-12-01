import { BN, web3 } from '@project-serum/anchor'
import { DataLoader, util } from '@sentre/senhub'
import { account } from '@senswap/sen-js'
import {
  createAssociatedTokenAccountInstruction,
  createCloseAccountInstruction,
  getAssociatedTokenAddress,
  NATIVE_MINT,
} from '@solana/spl-token-v3'

import configs from 'configs'

const {
  sol: { metaplexNFT },
} = configs

export const notifySuccess = (content: string, txId: string) => {
  return window.notify({
    type: 'success',
    description: `${content} successfully. Click to view details.`,
    onClick: () => window.open(util.explorer(txId), '_blank'),
  })
}

export const notifyError = (er: any) => {
  return window.notify({
    type: 'error',
    description: er.message,
  })
}

export const getMetaData = async (mintAddress: string) => {
  if (!account.isAddress(mintAddress)) {
    return undefined
  }
  try {
    const metadata = await DataLoader.load('getNftMetadata' + mintAddress, () =>
      metaplexNFT.getNftMetadata(mintAddress),
    )

    return metadata
  } catch (error: any) {
    return undefined
  }
}

export const current_timestamp = async () => {
  return new BN(new Date().getTime() / 1000)
}

export const createATAIx = async (wallet: web3.PublicKey) => {
  const ATA = await getAssociatedTokenAddress(NATIVE_MINT, wallet)

  return createAssociatedTokenAccountInstruction(
    wallet,
    ATA,
    wallet,
    NATIVE_MINT,
  )
}

export const createWrapSolIx = async (
  amount: number | bigint,
  wallet: web3.PublicKey,
) => {
  const ATA = await getAssociatedTokenAddress(NATIVE_MINT, wallet)

  return web3.SystemProgram.transfer({
    fromPubkey: wallet,
    toPubkey: ATA,
    lamports: amount,
  })
}

export const createUnWrapSolIx = async (wallet: web3.PublicKey) => {
  const ATA = await getAssociatedTokenAddress(NATIVE_MINT, wallet)

  return createCloseAccountInstruction(ATA, wallet, wallet)
}
