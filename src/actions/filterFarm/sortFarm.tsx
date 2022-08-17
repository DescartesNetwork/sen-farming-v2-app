import { useDispatch, useSelector } from 'react-redux'

import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, Divider, Row, Space, Switch, Typography } from 'antd'

import { AppState } from 'model'
import { setSort, SortDirection, switchBoostOnly } from 'model/main.controller'

const ICON_COLOR = {
  ASC: { up: '#727272', down: '#F3F3F3' },
  DESC: { up: '#F3F3F3', down: '#727272' },
  null: { up: '#727272', down: '#727272' },
}

type IconSortProps = { type: SortDirection }
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
  const dispatch = useDispatch()
  const sortType = useSelector((state: AppState) => state.main.sortType)
  const boostOnly = useSelector((state: AppState) => state.main.boostOnly)

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
                const direction =
                  sortType.liquidity === SortDirection.ASC
                    ? SortDirection.DESC
                    : SortDirection.ASC
                dispatch(
                  setSort({
                    liquidity: direction,
                    apr: SortDirection.null,
                  }),
                )
              }}
            >
              Liquidity
            </Button>
            <IconSort type={sortType.liquidity} />
          </Space>
          <Divider type="vertical" style={{ margin: 0 }} />
          <Space>
            <Button
              type="text"
              size="small"
              style={{ padding: 0, background: 'transparent' }}
              onClick={() => {
                const direction =
                  sortType.apr === SortDirection.ASC
                    ? SortDirection.DESC
                    : SortDirection.ASC
                dispatch(
                  setSort({ liquidity: SortDirection.null, apr: direction }),
                )
              }}
            >
              APR
            </Button>
            <IconSort type={sortType.apr} />
          </Space>
        </Space>
      </Col>
      <Col>
        <label style={{ cursor: 'pointer' }}>
          <Space size={6}>
            <Typography.Text style={{ userSelect: 'none' }}>
              Boost only
            </Typography.Text>
            <Switch
              size="small"
              checked={boostOnly}
              onChange={() => dispatch(switchBoostOnly())}
            />
          </Space>
        </label>
      </Col>
    </Row>
  )
}

export default SortFarm
