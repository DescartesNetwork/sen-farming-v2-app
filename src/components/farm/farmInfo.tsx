import { Fragment, MouseEvent, useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { util } from '@sentre/senhub'

import { Row, Col, Space, Typography, Tooltip, Button, Modal } from 'antd'
import IonIcon from '@sentre/antd-ionicon'

export type FarmInfoProps = {
  farmAddress?: string
  inputMint?: string
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
        <Tooltip title="Copied" visible={copied}>
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

const FarmInfo = ({ farmAddress = '', inputMint = '' }: FarmInfoProps) => {
  const [visible, setVisible] = useState(false)

  const showFarmInfo = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setVisible(true)
  }

  const onCloseModal = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation()
    setVisible(false)
  }

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
        onClick={showFarmInfo}
        icon={
          <IonIcon
            name="information-circle-outline"
            className="icon-describe"
          />
        }
      />
      <Modal
        visible={visible}
        onCancel={onCloseModal}
        footer={false}
        closable={false}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <FarmInfoItem title="Farming Address:" address={farmAddress} />
          </Col>
          <Col span={24}>
            <FarmInfoItem title="Staking mint address:" address={inputMint} />
          </Col>
        </Row>
      </Modal>
    </Fragment>
  )
}

export default FarmInfo
