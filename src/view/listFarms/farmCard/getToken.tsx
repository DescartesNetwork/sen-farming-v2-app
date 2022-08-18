import { MouseEvent } from 'react'

import { Avatar, Button, Col, Row, Space, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SpaceBetween from 'components/spaceBetween'
import CardTooltip from './cardTooltip'
import FarmTag from 'components/farmTag'

import { FARM_GET_TOKENS } from 'constant/farm'

type GetTokenProps = {
  farmAddress: string
}

const HowToGetIt = ({ farmAddress }: GetTokenProps) => {
  const getToken = FARM_GET_TOKENS[farmAddress]

  if (!getToken)
    return <Typography.Text type="secondary">No Data.</Typography.Text>

  const onGetToken = (url: string, e?: MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation()
    if (!url) return
    return window.open(url)
  }

  return (
    <Row gutter={[16, 16]} style={{ width: 300, padding: 8 }}>
      {Object.keys(getToken).map((key) => {
        const data = getToken[key]
        return (
          <Col span={24}>
            <SpaceBetween
              floatContent={
                data.recommend && (
                  <FarmTag>
                    <IonIcon name="medal-outline" /> Recommend
                  </FarmTag>
                )
              }
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

const GetToken = ({ farmAddress }: GetTokenProps) => {
  const farmToken = FARM_GET_TOKENS[farmAddress]

  return (
    <CardTooltip
      tooltip={<HowToGetIt farmAddress={farmAddress} />}
      visible={farmToken ? undefined : false}
    >
      <Button
        onClick={(e) => e.stopPropagation()}
        type="text"
        style={{ padding: 0, background: 'transparent' }}
        disabled={!farmToken}
      >
        Get tokens to stake
        <IonIcon name="open-outline" />
      </Button>
    </CardTooltip>
  )
}

export default GetToken
