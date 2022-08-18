import { Fragment, useMemo } from 'react'

import { MintSymbol } from '@sen-use/app'
import { useFarmRewards } from 'hooks/farm/useFarmRewards'

type GroupMintSymbolProps = {
  farmAddress: string
  separator?: string
  lastSeparator?: string
}
const GroupMintSymbol = ({
  farmAddress,
  lastSeparator = 'and',
  separator = ',',
}: GroupMintSymbolProps) => {
  const farmRewards = useFarmRewards(farmAddress)

  const mintRewards = useMemo(
    () => farmRewards.map(({ rewardMint }) => rewardMint.toBase58()),
    [farmRewards],
  )

  return (
    <span>
      {mintRewards.map((mint, idx) => {
        const splitChar = mintRewards.length === 2 ? lastSeparator : separator
        return (
          <Fragment key={mint}>
            {idx > 0 && ` ${splitChar} `} <MintSymbol mintAddress={mint} />
          </Fragment>
        )
      })}
    </span>
  )
}

export default GroupMintSymbol
