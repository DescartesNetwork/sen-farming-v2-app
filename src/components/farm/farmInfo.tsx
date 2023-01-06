import { Fragment, MouseEvent, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { util } from '@sentre/senhub'
import moment from 'moment'

import {
  Row,
  Col,
  Space,
  Typography,
  Tooltip,
  Button,
  Modal,
  Divider,
} from 'antd'
import IonIcon from '@sentre/antd-ionicon'
import SpaceBetween from 'components/spaceBetween'

import { useFarmData } from 'hooks/farm/useFarmData'
import { DATE_FORMAT } from 'constant'

export type FarmInfoProps = {
  farmAddress: string
}

export type FarmInfoItemProps = {
  title?: string
  address?: string
}

const FarmInfoItem = ({ title = '', address = '' }: FarmInfoItemProps) => {
  const [copied, setCopied] = useState(false)

  const onCopy = async (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setCopied(true)
    await util.asyncWait(500)
    setCopied(false)
  }
  return (
    <Row gutter={[8, 8]}>
      <Col span={10}>
        <Space align="baseline">
          <IonIcon style={{ fontSize: 16 }} name="alert-circle-outline" />
          <Typography.Text>{title}</Typography.Text>
        </Space>
      </Col>
      <Col span={12}>
        <Typography.Text>{address} </Typography.Text>
      </Col>
      <Col span={2}>
        <Tooltip title="Copied" open={copied}>
          <CopyToClipboard text={address}>
            <Button
              style={{
                width: 'auto',
                height: 'auto',
                padding: 0,
                background: 'transparent',
              }}
              type="text"
              icon={<IonIcon name="copy-outline" />}
              onClick={onCopy}
            />
          </CopyToClipboard>
        </Tooltip>
      </Col>
    </Row>
  )
}

const FarmInfo = ({ farmAddress }: FarmInfoProps) => {
  const [visible, setVisible] = useState(false)
  const farmData = useFarmData(farmAddress)

  return (
    <Fragment>
      <Button
        type="text"
        style={{
          width: 'auto',
          height: 'auto',
          padding: 0,
          background: 'transparent',
        }}
        onClick={() => setVisible(true)}
        icon={
          <IonIcon
            name="information-circle-outline"
            className="icon-describe"
          />
        }
      />
      <Modal
        visible={visible}
        onCancel={() => setVisible(false)}
        footer={false}
        closable={false}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <FarmInfoItem title="Farm Address:" address={farmAddress} />
          </Col>
          <Col span={24}>
            <FarmInfoItem
              title="Staked Mint Address:"
              address={farmData.inputMint.toBase58()}
            />
          </Col>
          <Col span={24}>
            <Divider style={{ margin: '12px 0' }} />
          </Col>
          {/* Start date */}
          <Col span={24}>
            <SpaceBetween
              floatContent={
                <Typography.Text>
                  {moment(farmData.startDate.toNumber() * 1000).format(
                    DATE_FORMAT,
                  )}
                </Typography.Text>
              }
            >
              <Typography.Text type="secondary">Start Date</Typography.Text>
            </SpaceBetween>
          </Col>
          {/* End date */}
          <Col span={24}>
            <SpaceBetween
              floatContent={
                <Typography.Text>
                  {moment(farmData.endDate.toNumber() * 1000).format(
                    DATE_FORMAT,
                  )}
                </Typography.Text>
              }
            >
              <Typography.Text type="secondary">End Date</Typography.Text>
            </SpaceBetween>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default FarmInfo
