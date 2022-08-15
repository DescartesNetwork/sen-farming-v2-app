import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Divider, Row, Space, Switch, Typography } from 'antd'

const ICON_COLOR = {
  ADS: { up: '#727272', down: '#F3F3F3' },
  DESC: { up: '#F3F3F3', down: '#727272' },
}

type IconSortProps = { type: 'ADS' | 'DESC' }
const IconSort = ({ type }: IconSortProps) => {
  const iconColor = ICON_COLOR[type]

  return (
    <Row style={{ flexDirection: 'column' }}>
      <Col style={{ height: 10 }}>
        <IonIcon
          style={{ fontSize: 12, color: iconColor.up }}
          name="caret-up-outline"
        />
      </Col>
      <Col>
        <IonIcon
          style={{ fontSize: 12, color: iconColor.down }}
          name="caret-down-outline"
        />
      </Col>
    </Row>
  )
}

const SortFarm = () => {
  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <Space size={6}>
          <Typography.Text type="secondary">Sort by:</Typography.Text>
          <Space>
            <Button
              type="text"
              size="small"
              style={{ padding: 0, background: 'transparent' }}
            >
              Liquidity
            </Button>
            <IconSort type="ADS" />
          </Space>
          <Divider type="vertical" style={{ margin: 0 }} />
          <Space>
            <Button
              type="text"
              size="small"
              style={{ padding: 0, background: 'transparent' }}
            >
              APR
            </Button>
            <IconSort type="ADS" />
          </Space>
        </Space>
      </Col>
      <Col>
        <label style={{ cursor: 'pointer' }}>
          <Space size={6}>
            <Typography.Text style={{ userSelect: 'none' }}>
              Boost only
            </Typography.Text>
            <Switch size="small" />
          </Space>
        </label>
      </Col>
    </Row>
  )
}

export default SortFarm
