import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { Col, Empty, Row, Spin } from 'antd'
import LazyLoad, { forceCheck } from '@sentre/react-lazyload'
import FarmCard from './farmCard'

import { searchFarm } from 'hooks/farms/useSearchedFarms'
import { useFilterFarms } from 'hooks/farms/useFilterFarms'
import { useSortFarms } from 'hooks/farms/useSortFarms'
import { AppState } from 'model'

export const ListFarms = () => {
  // Global store
  const { boostOnly, farmTab, searchKey, sortType } = useSelector(
    (state: AppState) => state.main,
  )
  // State
  const [displayFarms, setDisplayFarms] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  // Hook
  const sortFarm = useSortFarms()
  const filterFarms = useFilterFarms()

  const updateDisplayFarms = useCallback(async () => {
    // Filter Farm
    const filteredFarm = await filterFarms(boostOnly, farmTab)
    // Search farm
    const searchedFarms = await searchFarm(filteredFarm, searchKey)
    // Sort Farm
    const sortedFarm = await sortFarm(searchedFarms, sortType)
    return setDisplayFarms(sortedFarm)
  }, [boostOnly, farmTab, searchKey, sortType, filterFarms, sortFarm])

  useEffect(() => {
    setLoading(true)
    const timeout = setTimeout(async () => {
      await updateDisplayFarms()
      // Update loading + forceCheck
      setTimeout(() => {
        forceCheck()
        setLoading(false)
      }, 250)
    }, 300)
    return () => clearTimeout(timeout)
  }, [updateDisplayFarms])

  return (
    <Spin spinning={loading} style={{ minHeight: 200 }}>
      <Row gutter={[24, 24]}>
        {!!displayFarms.length ? (
          displayFarms.map((farmAddress) => (
            <Col xs={24} lg={12} key={farmAddress}>
              <LazyLoad height={230.05}>
                <FarmCard farmAddress={farmAddress} />
              </LazyLoad>
            </Col>
          ))
        ) : (
          <Col span={24} style={{ textAlign: 'center' }}>
            <Empty className="ico-empty" />
          </Col>
        )}
      </Row>
    </Spin>
  )
}
