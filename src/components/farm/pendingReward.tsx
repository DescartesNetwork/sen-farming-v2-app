import { util } from '@sentre/senhub'

import { useCalcPendingReward } from 'hooks/farmInfos/useReward'
import { useEffect, useState } from 'react'

const PendingReward = ({ farmAddress }: { farmAddress: string }) => {
  const [totalReward, setTotalReward] = useState(0)
  const calcPendingReward = useCalcPendingReward(farmAddress)

  useEffect(() => {
    const reward = calcPendingReward()
    setTotalReward(reward)
  }, [calcPendingReward])

  return <span>{util.numeric(totalReward).format('$0,0.[00]')}</span>
}

export default PendingReward
