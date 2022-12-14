import IonIcon from '@sentre/antd-ionicon'
import { Button, Space } from 'antd'
import { useFarmData } from 'hooks/farm/useFarmData'
import CardTooltip from 'view/listFarms/farmCard/cardTooltip'

import { FARM_GET_TOKENS } from 'constant/farm'
import ListTokenRecommend from './listTokenRecommend'

import './index.less'

type RecommendToGetTokenProps = {
  farmAddress: string
}
const RecommendToGetToken = ({ farmAddress }: RecommendToGetTokenProps) => {
  const farmData = useFarmData(farmAddress)
  const farmToken = FARM_GET_TOKENS[farmData.inputMint.toBase58()]

  return (
    <CardTooltip
      tooltip={<ListTokenRecommend farmAddress={farmAddress} />}
      visible={farmToken ? undefined : false}
    >
      <Space size={4}>
        <Button
          onClick={(e) => e.stopPropagation()}
          type="text"
          style={{ padding: 0, background: 'transparent' }}
          disabled={!farmToken}
        >
          Get tokens to stake
        </Button>
        <Button
          type="text"
          size="small"
          icon={
            <IonIcon
              style={{ fontSize: 16 }}
              name="information-circle-outline"
            />
          }
          disabled={!farmToken}
        />
      </Space>
    </CardTooltip>
  )
}

export default RecommendToGetToken
