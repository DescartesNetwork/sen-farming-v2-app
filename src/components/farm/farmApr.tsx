import { util } from '@sentre/senhub'

import { useFarmAPR } from 'hooks/farm/useFarmAPR'

const FarmApr = ({ farmAddress }: { farmAddress: string }) => {
  const { roi } = useFarmAPR(farmAddress)
  return <span>{util.numeric(roi).format('0,0.[00]%')}</span>
}
export default FarmApr
