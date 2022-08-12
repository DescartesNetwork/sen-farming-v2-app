import IonIcon from '@sentre/antd-ionicon'
import { Button, Col, InputNumber, Row, Typography } from 'antd'
import ModalNftCollection from './modalNftCollection'

import { BoostData } from './index'

type AddBoostProps = {
  boosData: BoostData
  index: number
  onDelete: (index: number) => void
  onChange: (index: number, value: Partial<BoostData>) => void
}

const AddBoost = ({ index, onDelete, boosData, onChange }: AddBoostProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={24}>
        <Row align="middle">
          <Col flex="auto">
            <Typography.Text>Collection NFT #{index + 1}</Typography.Text>
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
          mintAddress={boosData.collection}
          onSelect={(collection) =>
            onChange(index, { ...boosData, collection })
          }
        />
      </Col>
      <Col span={12} className="boost-nft">
        <InputNumber
          value={boosData.percentage}
          style={{ height: 40 }}
          placeholder="Enter percentage"
          name="budget"
          onChange={(percentage) =>
            onChange(index, { ...boosData, percentage })
          }
        />
      </Col>
    </Row>
  )
}

export default AddBoost
