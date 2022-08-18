import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, InputNumber, Row, Typography } from 'antd'
import ModalNftCollection from './modalNftCollection'

import { BoostData } from './index'

type AddBoostProps = {
  boostData: BoostData
  index: number
  onDelete: (index: number) => void
  onChange: (index: number, value: Partial<BoostData>) => void
}

const AddBoost = ({ index, onDelete, boostData, onChange }: AddBoostProps) => {
  // set value zero to undefined to show placeholder
  const value = !!boostData.percentage ? boostData.percentage : undefined

  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row align="middle">
          <Col flex="auto">
            <Typography.Text>NFT Collection #{index + 1}</Typography.Text>
          </Col>
          {index !== 0 && (
            <Col>
              <Button
                onClick={() => onDelete(index)}
                type="text"
                icon={<IonIcon name="trash-outline" />}
              />
            </Col>
          )}
        </Row>
      </Col>
      <Col span={12}>
        <ModalNftCollection
          mintAddress={boostData.collection}
          onSelect={(collection) =>
            onChange(index, { ...boostData, collection })
          }
        />
      </Col>
      <Col span={12} className="boost-nft">
        <InputNumber
          value={value}
          style={{ height: 40 }}
          placeholder="Enter boost rate"
          name="budget"
          onChange={(percentage) =>
            onChange(index, { ...boostData, percentage })
          }
        />
      </Col>
    </Row>
  )
}

export default AddBoost
