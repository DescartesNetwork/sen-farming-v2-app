import IonIcon from '@sentre/antd-ionicon'
import { Col, DatePicker, Row, Space, Typography } from 'antd'

import { DATE_FORMAT } from 'constant'
import moment from 'moment'

export type Time = {
  startAt: number
  endAt: number
}

type AddTimeProps = {
  time: Time
  onChange: (name: keyof Time, value: number) => void
}

const AddTime = ({ time, onChange }: AddTimeProps) => {
  return (
    <Row gutter={[8, 8]}>
      <Col span={12}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>Start time</Typography.Text>
          <DatePicker
            placeholder="Select time"
            suffixIcon={<IonIcon name="time-outline" />}
            className="date-option"
            onChange={(date) => onChange('startAt', date?.valueOf() || 0)}
            clearIcon={null}
            value={time.startAt ? moment(time.startAt) : moment(Date.now())}
            showTime={{ showSecond: false }}
            placement="bottomRight"
            format={DATE_FORMAT}
          />
        </Space>
      </Col>
      <Col span={12}>
        <Space direction="vertical" style={{ width: '100%' }}>
          <Typography.Text>End time</Typography.Text>
          <DatePicker
            placeholder="Select time"
            suffixIcon={<IonIcon name="time-outline" />}
            className="date-option"
            onChange={(date) => onChange('endAt', date?.valueOf() || 0)}
            clearIcon={null}
            value={time.endAt ? moment(time.endAt) : undefined}
            showTime={{ showSecond: false }}
            placement="bottomRight"
            format={DATE_FORMAT}
          />
        </Space>
      </Col>
    </Row>
  )
}

export default AddTime
