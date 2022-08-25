import React, { MouseEvent } from 'react'

import IonIcon from '@sentre/antd-ionicon'
import { Avatar, Col, Row, Space, Typography } from 'antd'
import FarmTag from 'components/farmTag'
import SpaceBetween from 'components/spaceBetween'

import { FARM_GET_TOKENS } from 'constant/farm'
import { useFarmData } from 'hooks/farm/useFarmData'

type ListTokenRecommendProps = {
  farmAddress: string
}

const ListTokenRecommend = ({ farmAddress }: ListTokenRecommendProps) => {
  const farmData = useFarmData(farmAddress)
  const getToken = FARM_GET_TOKENS[farmData.inputMint.toBase58()]

  if (!getToken)
    return <Typography.Text type="secondary">No Data.</Typography.Text>

  const onGetToken = (url: string, e?: MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation()
    if (!url) return
    return window.open(url)
  }

  return (
    <Row
      gutter={[16, 16]}
      style={{ maxWidth: 380, padding: 8 }}
      onClick={(e) => e.stopPropagation()}
    >
      {Object.keys(getToken).map((key) => {
        const data = getToken[key]
        return (
          <Col span={24}>
            <SpaceBetween
              floatContent={
                data.recommend && (
                  <FarmTag>
                    <IonIcon name="medal-outline" /> Recommended
                  </FarmTag>
                )
              }
              gutter={[12, 12]}
            >
              <Space>
                <Avatar src={data.icon} size={24} shape="square" />
                <Typography.Text
                  className="get-token"
                  onClick={(e) => {
                    onGetToken(data.url, e)
                  }}
                >
                  {data.description}
                </Typography.Text>
              </Space>
            </SpaceBetween>
          </Col>
        )
      })}
    </Row>
  )
}

export default ListTokenRecommend
