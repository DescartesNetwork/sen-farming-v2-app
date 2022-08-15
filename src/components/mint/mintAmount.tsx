import { memo, useCallback, useState } from 'react'
import { Address, BN } from '@project-serum/anchor'
import { useMintDecimals, util } from '@sentre/senhub'
import { useDebounce } from 'react-use'
import { utilsBN } from '@sen-use/web3/dist'

const DEFAULT_DECIMALS = 9

const MintAmount = ({
  mintAddress,
  amount,
  format = '0,0.[0000]',
}: {
  mintAddress: Address
  amount: BN
  format?: string
}) => {
  const [amountUi, setAmountUi] = useState('0')
  const decimals = useMintDecimals({ mintAddress: mintAddress.toString() })

  const updateAmount = useCallback(() => {
    const amountUi = utilsBN.undecimalize(amount, decimals || DEFAULT_DECIMALS)
    setAmountUi(util.numeric(amountUi).format(format))
  }, [amount, decimals, format])
  useDebounce(updateAmount, 300, [updateAmount])

  return <span>{amountUi}</span>
}

export default memo(MintAmount)
