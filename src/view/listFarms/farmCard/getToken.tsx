import { MouseEvent } from 'react'

import { Avatar, Button, Col, Row, Space, Tooltip, Typography } from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SpaceBetween from 'components/spaceBetween'

import { FARM_GET_TOKENS } from 'constant/farm'

import BALANSOL_ICON from 'static/images/balansol-icon.png'
import GATE_ICON from 'static/images/gate-icon.png'

type GetTokenProps = {
  farmAddress: string
}

const HowToGetIt = ({ farmAddress }: GetTokenProps) => {
  const getToken = FARM_GET_TOKENS[farmAddress] || {}

  const balansol = getToken.balansol || ''
  const gate = getToken.gate || ''

  const onGetToken = (url: string, e?: MouseEvent<HTMLDivElement>) => {
    e?.stopPropagation()
    if (!url) return
    return window.open(url)
  }

  return (
    <Row gutter={[16, 16]} style={{ width: 300, padding: 8 }}>
      {balansol && (
        <Col span={24}>
          <SpaceBetween
            floatContent={
              <Typography.Text className="caption" style={{ color: '#A0E86F' }}>
                Recommended
              </Typography.Text>
            }
          >
            <Space>
              <Avatar src={BALANSOL_ICON} size={24} shape="square" />
              <Typography.Text
                className="get-token"
                onClick={(e) => {
                  onGetToken(balansol, e)
                }}
              >
                Swap on Balansol
              </Typography.Text>
            </Space>
          </SpaceBetween>
        </Col>
      )}
      {gate && (
        <Col span={24}>
          <Space>
            <Avatar src={GATE_ICON} size={24} shape="square" />
            <Typography.Text
              className="get-token"
              onClick={(e) => {
                onGetToken(gate, e)
              }}
            >
              Buy on Gate.io
            </Typography.Text>
          </Space>
        </Col>
      )}
    </Row>
  )
}

const GetToken = ({ farmAddress }: GetTokenProps) => {
  return (
    <Tooltip className="hh" title={<HowToGetIt farmAddress={farmAddress} />}>
      <Button type="text" style={{ padding: 0, background: 'transparent' }}>
        Get tokens to stake
        <IonIcon name="open-outline" />
      </Button>
    </Tooltip>
  )
}

export default GetToken
