import { useCallback, useState } from 'react'
import { web3 } from '@project-serum/anchor'
import BN from 'bn.js'

import { notifyError, notifySuccess } from 'helper'
import { BoostData } from 'actions/createFarm/boostNFT'
import { Reward } from 'actions/createFarm'

type InitializeFarmProps = {
  inputMint: string
  startAfter: number
  endAfter: number
  tokenRewards: Reward[]
  boostsData: BoostData[]
}

const farming = window.senFarming
const provider = window.senFarming.provider

export const useCreateFarm = () => {
  const [loading, setLoading] = useState(false)

  const initializeFarm = useCallback(
    async ({
      inputMint,
      startAfter,
      endAfter,
      tokenRewards,
      boostsData,
    }: InitializeFarmProps) => {
      try {
        setLoading(true)
        const mintPubKey = new web3.PublicKey(inputMint)
        let farm = web3.Keypair.generate()
        const transaction = new web3.Transaction()
        const { tx: txInitializeFarm } = await farming.initializeFarm({
          inputMint: mintPubKey,
          startAfter: startAfter,
          endAfter: endAfter,
          sendAndConfirm: false,
          farmKeypair: farm,
        })
        transaction.add(txInitializeFarm)
        await Promise.all(
          boostsData.map(async ({ collection, percentage }) => {
            const { tx: txPushFarmBoostingCollection } =
              await farming.pushFarmBoostingCollection({
                farm: farm.publicKey,
                collection: collection,
                coefficient: new BN(percentage),
                sendAndConfirm: false,
              })
            transaction.add(txPushFarmBoostingCollection)
          }),
        )

        await Promise.all(
          tokenRewards.map(async (reward) => {
            const { tx: txPushFarmReward } = await farming.pushFarmReward({
              farm: farm.publicKey,
              rewardMint: reward.mintAddress,
              rewardAmount: new BN(reward.budget),
              sendAndConfirm: false,
            })
            transaction.add(txPushFarmReward)
          }),
        )

        const txId = await provider.sendAndConfirm(transaction, [farm])
        notifySuccess('Initialize farm', `${txId}`)
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [],
  )

  return { initializeFarm, loading }
}
