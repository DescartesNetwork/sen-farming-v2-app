import { memo, useCallback, useState } from 'react'
import { Address, BN } from '@project-serum/anchor'
import { useMintDecimals, util } from '@sentre/senhub'
import { useDebounce } from 'react-use'
import { utilsBN } from '@sen-use/web3/dist'

const DEFAULT_DECIMALS = 9

type MintAmountProps = {
  mintAddress: Address
  amount: BN
  format?: string
  perDate?: boolean
}
const MintAmount = ({
  mintAddress,
  amount,
  format = '0,0.[0000]',
  perDate = false,
}: MintAmountProps) => {
  const [amountUi, setAmountUi] = useState('0')
  const decimals = useMintDecimals({ mintAddress: mintAddress.toString() })
  const dateRatio = perDate ? 7 : 1

  const updateAmount = useCallback(() => {
    const amountUi = utilsBN.undecimalize(amount, decimals || DEFAULT_DECIMALS)
    setAmountUi(util.numeric(Number(amountUi) / dateRatio).format(format))
  }, [amount, dateRatio, decimals, format])
  useDebounce(updateAmount, 300, [updateAmount])

  return <span>{amountUi}</span>
}

export default memo(MintAmount)
