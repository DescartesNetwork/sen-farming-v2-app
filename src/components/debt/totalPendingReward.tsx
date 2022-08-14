import { util } from '@sentre/senhub'

import { useEffect, useState } from 'react'

const TotalPendingReward = ({ farmAddress }: { farmAddress: string }) => {
  const [totalReward, setTotalReward] = useState(0)

  useEffect(() => {
    setTotalReward(Math.random() * 1000)
  }, [])

  return <span>{util.numeric(totalReward).format('$0,0.[00]')}</span>
}

export default TotalPendingReward
