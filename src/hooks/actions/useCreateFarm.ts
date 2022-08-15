import { utilsBN } from '@sen-use/web3/dist'
import { useCallback, useState } from 'react'
import { web3, BN } from '@project-serum/anchor'
import { useGetMintDecimals } from '@sentre/senhub'

import { notifyError, notifySuccess } from 'helper'
import { BoostData } from 'actions/createFarm/boostNFT'
import { Reward } from 'actions/createFarm'

type InitializeFarmProps = {
  inputMint: string
  startAt: number
  endAt: number
  tokenRewards: Reward[]
  boostsData: BoostData[]
}

export const useCreateFarm = () => {
  const [loading, setLoading] = useState(false)
  const getMintDecimals = useGetMintDecimals()

  const initializeFarm = useCallback(
    async ({
      inputMint,
      startAt,
      endAt,
      tokenRewards,
      boostsData,
    }: InitializeFarmProps) => {
      try {
        setLoading(true)
        const farming = window.senFarming
        const provider = window.senFarming.provider
        const mintPubKey = new web3.PublicKey(inputMint)
        // Check time
        const currentTime = new Date().getTime()
        let startAfter = 0
        if (startAt > currentTime)
          startAfter = Math.floor((startAt - currentTime) / 1000)
        const endAfter = Math.floor((endAt - currentTime) / 1000)
        // Initialize farm
        let farm = web3.Keypair.generate()

        const { tx: txInitializeFarm } = await farming.initializeFarm({
          inputMint: mintPubKey,
          startAfter: startAfter + 10,
          endAfter: endAfter,
          sendAndConfirm: false,
          farmKeypair: farm,
        })

        // Add Boosting
        const txBoosts = new web3.Transaction()
        await Promise.all(
          boostsData.map(async ({ collection, percentage }) => {
            const { tx: txPushFarmBoostingCollection } =
              await farming.pushFarmBoostingCollection({
                farm: farm.publicKey,
                collection: collection,
                coefficient: new BN(percentage),
                sendAndConfirm: false,
              })
            txBoosts.add(txPushFarmBoostingCollection)
          }),
        )
        // Add Reward
        const txRewards = new web3.Transaction()
        await Promise.all(
          tokenRewards.map(async ({ mintAddress, budget }) => {
            const mintDecimals = await getMintDecimals({
              mintAddress,
            })
            if (!mintDecimals) throw new Error("Can't find mint decimals")
            const rewardAmount = utilsBN.decimalize(budget, mintDecimals)
            const { tx: txPushFarmReward } = await farming.pushFarmReward({
              farm: farm.publicKey,
              rewardMint: mintAddress,
              rewardAmount,
              sendAndConfirm: false,
            })
            txRewards.add(txPushFarmReward)
          }),
        )

        const allTxs = [
          { tx: txInitializeFarm, signers: [farm] },
          { tx: txBoosts, signers: [] },
          { tx: txRewards, signers: [] },
        ].filter((e) => !!e.tx.instructions.length)

        const txId = await provider.sendAll(allTxs)
        notifySuccess('Initialize farm', txId[0])
      } catch (error: any) {
        notifyError(error)
      } finally {
        setLoading(false)
      }
    },
    [getMintDecimals],
  )

  return { initializeFarm, loading }
}
