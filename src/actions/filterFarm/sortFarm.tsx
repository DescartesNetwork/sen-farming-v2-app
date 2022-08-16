import { useDispatch, useSelector } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Divider, Row, Space, Switch, Typography } from 'antd'

import { AppState } from 'model'
import { setSort, switchBoostOnly } from 'model/main.controller'

const ICON_COLOR = {
  ADS: { up: '#727272', down: '#F3F3F3' },
  DESC: { up: '#F3F3F3', down: '#727272' },
}

export type sortDirection = 'ADS' | 'DESC'

type IconSortProps = { type?: sortDirection }
const IconSort = ({ type }: IconSortProps) => {
  const iconColor = !type
    ? { up: '#727272', down: '#727272' }
    : ICON_COLOR[type]

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
  const dispatch = useDispatch()
  const sort = useSelector((state: AppState) => state.main.sort)

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
              onClick={() => {
                const direction = sort['liquidity'] === 'ADS' ? 'DESC' : 'ADS'
                dispatch(setSort({ liquidity: direction }))
              }}
            >
              Liquidity
            </Button>
            <IconSort type={sort['liquidity']} />
          </Space>
          <Divider type="vertical" style={{ margin: 0 }} />
          <Space>
            <Button
              type="text"
              size="small"
              style={{ padding: 0, background: 'transparent' }}
              onClick={() => {
                const direction = sort['apr'] === 'ADS' ? 'DESC' : 'ADS'
                dispatch(setSort({ apr: direction }))
              }}
            >
              APR
            </Button>
            <IconSort type={sort['apr']} />
          </Space>
        </Space>
      </Col>
      <Col>
        <label style={{ cursor: 'pointer' }}>
          <Space size={6}>
            <Typography.Text style={{ userSelect: 'none' }}>
              Boost only
            </Typography.Text>
            <Switch size="small" onChange={() => dispatch(switchBoostOnly())} />
          </Space>
        </label>
      </Col>
    </Row>
  )
}

export default SortFarm
