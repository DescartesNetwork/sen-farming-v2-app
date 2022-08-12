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

const TimeCountDown = memo(({ endTime }: { endTime: number }) => {
  const startTime = Math.floor(Date.now() / 1000)
  const duration = moment.duration(endTime - startTime, 'seconds')

  const [countDown, setCountDown] = useState({
    days: duration.days(),
    hours: duration.hours(),
    minutes: duration.minutes(),
    seconds: duration.seconds(),
  })

  const updateCountDown = useCallback(async () => {
    if (!endTime) return
    const startTime = Math.floor(Date.now() / 1000)
    // TODO: startTime > endTime  (finish)
    // TODO: unlimited
    const duration = moment.duration(endTime - startTime, 'seconds')
    const days = duration.days()
    const hours = duration.hours()
    const minutes = duration.minutes()
    const seconds = duration.seconds()
    setCountDown({ days, hours, minutes, seconds })
  }, [endTime])

  useEffect(() => {
    const interval = setInterval(() => updateCountDown(), 1000)
    return () => clearInterval(interval)
  }, [updateCountDown])

  if (!endTime) return <Typography.Text>Unlimited</Typography.Text>
  return (
    <Space size={4}>
      {!!countDown.days && (
        <Fragment>
          <TimeTag>
            <Typography.Text className="countdown">
              {countDown.days}d
            </Typography.Text>
          </TimeTag>
          :
        </Fragment>
      )}
      <TimeTag>
        <Typography.Text className="countdown">
          {countDown.hours}h
        </Typography.Text>
      </TimeTag>
      :
      <TimeTag>
        <Typography.Text className="countdown">
          {countDown.minutes}m
        </Typography.Text>
      </TimeTag>
      {!countDown.days && (
        <Fragment>
          :
          <TimeTag>
            <Typography.Text className="countdown">
              {countDown.seconds}s
            </Typography.Text>
          </TimeTag>
        </Fragment>
      )}
    </Space>
  )
})
export default TimeCountDown
