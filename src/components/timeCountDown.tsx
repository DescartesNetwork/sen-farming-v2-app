import {
  CSSProperties,
  Fragment,
  memo,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import moment from 'moment'

import { Space, Tag, Typography } from 'antd'

type TimeTagProps = { children?: ReactNode; style?: CSSProperties }
const TimeTag = ({ children, style }: TimeTagProps) => {
  return (
    <Tag
      style={{
        background: '#141413',
        border: 'none',
        borderRadius: 4,
        marginRight: 0,
        ...style,
      }}
    >
      {children}
    </Tag>
  )
}

type TimeCountDownProps = { endTime: number; label?: string }
const TimeCountDown = memo(({ endTime, label }: TimeCountDownProps) => {
  const startTime = Math.floor(Date.now() / 1000)
  const duration = moment.duration(endTime - startTime, 'seconds')
  const now = Date.now()

  const [countDown, setCountDown] = useState({
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  })

  const updateCountDown = useCallback(async () => {
    if (!endTime || endTime * 1000 < now) return
    const startTime = Math.floor(Date.now() / 1000)
    // TODO: startTime > endTime  (finish)
    // TODO: unlimited
    const duration = moment.duration(endTime - startTime, 'seconds')
    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    setCountDown({ days, hours, minutes, seconds })
  }, [endTime, now])

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 1000)
    return () => clearInterval(interval)
  }, [updateCountDown])

  if (!endTime) return <Typography.Text>Unlimited</Typography.Text>
  if (endTime * 1000 < now)
    return (
      <TimeTag>
        <Typography.Text>Finished</Typography.Text>
      </TimeTag>
    )
  return (
    <Space size={6}>
      {!!label && <Typography.Text type="secondary">{label}</Typography.Text>}
      <Space size={4}>
        {!!countDown.days && (
          <Fragment>
            <TimeTag>
              <Typography.Text>{countDown.days}d</Typography.Text>
            </TimeTag>
            :
          </Fragment>
        )}
        <TimeTag>
          <Typography.Text>{countDown.hours}h</Typography.Text>
        </TimeTag>
        :
        <TimeTag>
          <Typography.Text>{countDown.minutes}m</Typography.Text>
        </TimeTag>
        {!countDown.days && (
          <Fragment>
            :
            <TimeTag>
              <Typography.Text>{countDown.seconds}s</Typography.Text>
            </TimeTag>
          </Fragment>
        )}
      </Space>
    </Space>
  )
})
export default TimeCountDown
