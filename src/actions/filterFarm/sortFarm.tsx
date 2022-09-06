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

type IconSortProps = {
  type: SortDirection
  onClick?: (type: SortDirection) => void
}
const IconSort = ({ type, onClick = () => {} }: IconSortProps) => {
  const iconColor = ICON_COLOR[type]

  return (
    <Space className="btn-sort-direction" direction="vertical" size={0}>
      <Button
        type="text"
        size="small"
        style={{
          color: iconColor.up,
        }}
        icon={<IonIcon style={{ fontSize: 12 }} name="caret-up-outline" />}
        onClick={() => onClick(SortDirection.DESC)}
      />
      <Button
        type="text"
        size="small"
        style={{
          color: iconColor.down,
        }}
        icon={<IonIcon style={{ fontSize: 12 }} name="caret-down-outline" />}
        onClick={() => onClick(SortDirection.ASC)}
      />
    </Space>
  )
}

const SortFarm = () => {
  const dispatch = useDispatch()
  const sortType = useSelector((state: AppState) => state.main.sortType)
  const boostOnly = useSelector((state: AppState) => state.main.boostOnly)

  const onSortLiquidity = (type?: SortDirection) => {
    if (type === sortType.liquidity) return

    let direction = SortDirection.ASC
    if (sortType.liquidity !== SortDirection.DESC)
      direction = SortDirection.DESC
    if (!!type) direction = type

    dispatch(
      setSort({
        liquidity: direction,
        apr: SortDirection.null,
      }),
    )
  }

  const onSortApr = (type?: SortDirection) => {
    if (type === sortType.apr) return

    let direction = SortDirection.ASC
    if (sortType.apr !== SortDirection.DESC) direction = SortDirection.DESC
    if (!!type) direction = type

    dispatch(
      setSort({
        liquidity: SortDirection.null,
        apr: direction,
      }),
    )
  }

  return (
    <Row gutter={[16, 16]} align="middle">
      <Col>
        <Space size={6}>
          <Typography.Text type="secondary">Sort by:</Typography.Text>
          <Space className="space-middle-icon">
            <Button
              type="text"
              size="small"
              style={{ padding: 0, background: 'transparent' }}
              onClick={() => onSortLiquidity()}
            >
              Liquidity
            </Button>
            <IconSort
              onClick={(type) => onSortLiquidity(type)}
              type={sortType.liquidity}
            />
          </Space>
          <Divider type="vertical" style={{ margin: 0 }} />
          <Space className="space-middle-icon">
            <Button
              type="text"
              size="small"
              style={{ padding: 0, background: 'transparent' }}
              onClick={() => onSortApr()}
            >
              APR
            </Button>
            <IconSort onClick={(type) => onSortApr(type)} type={sortType.apr} />
          </Space>
        </Space>
      </Col>
      <Col>
        <label style={{ cursor: 'pointer' }}>
          <Space size={6}>
            <Typography.Text style={{ userSelect: 'none' }}>
              Boosted Only
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
