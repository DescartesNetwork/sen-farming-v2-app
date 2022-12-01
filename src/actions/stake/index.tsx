import { Fragment, useCallback, useEffect, useMemo, useState } from 'react'
import { utilsBN } from '@sen-use/web3'
import { useMintDecimals, util } from '@sentre/senhub'
import { BN } from '@project-serum/anchor'

import { Row, Col, Typography, Button, Space, Card, Tooltip } from 'antd'
import CardNumbericInput from 'components/cardNumbericInput'
import SpaceBetween from 'components/spaceBetween'
import { MintSymbol } from '@sen-use/app'
import BoostingNFT from 'actions/boostingNFT'

import { useFarmData } from 'hooks/farm/useFarmData'
import { useStake } from 'hooks/actions/useStake'
import { checkFinishedFarm } from 'hooks/farms/useFilterFarms'
import { useDebtData } from 'hooks/debt/useDebtData'
import { useGetListBoostRate } from 'hooks/boost/useGetListBoostRate'
import { useTotalBoosted } from 'hooks/boost/useTotalBoosted'
import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'

import { PRECISION } from 'constant'
import { FARM_GET_TOKENS } from 'constant/farm'
import IonIcon from '@sentre/antd-ionicon'
import { useWrapAccountBalance } from 'hooks/useWrapAccountBalance'

const Stake = ({ farmAddress }: { farmAddress: string }) => {
  const [inAmount, setInAmount] = useState<string>('')
  const [selectedNFTs, setSelectedNFTs] = useState<string[]>([])
  const [listBoostRate, setListBoostRate] = useState<Record<string, BN>>({})
  const farmData = useFarmData(farmAddress)
  const { stake, loading } = useStake(farmAddress)
  const debtData = useDebtData(farmAddress)
  const totalBoosted = useTotalBoosted(farmAddress)
  const getListBoostRate = useGetListBoostRate(farmAddress)
  const decimals =
    useMintDecimals({
      mintAddress: farmData.inputMint.toBase58(),
    }) || 0
  const getToken = FARM_GET_TOKENS[farmData.inputMint.toBase58()]
  const farmBoostingData = useFarmBoosting(farmAddress)
  const { balance } = useWrapAccountBalance(farmData.inputMint.toBase58())

  const onGetToken = () => {
    if (!getToken) return
    const data = Object.values(getToken).find((item) => item.recommend)
    if (!data) return
    return window.open(data.url)
  }

  const yourAmountIn = useMemo(() => {
    const inAmountNumber = Number(inAmount)
    if (inAmountNumber === 0) return 0
    return inAmountNumber
  }, [inAmount])

  const stakedAmount = useMemo(
    () =>
      !debtData || (!yourAmountIn && !selectedNFTs.length)
        ? new BN(0)
        : debtData.shares.mul(PRECISION).div(debtData.leverage),
    [debtData, selectedNFTs.length, yourAmountIn],
  )

  const displayBoosted =
    !yourAmountIn && !selectedNFTs.length ? new BN(0) : totalBoosted

  const boostRate = useMemo(() => {
    let totalPercent = new BN(0)
    if (!selectedNFTs.length) return totalPercent
    for (const mintAddress in listBoostRate) {
      const percent = listBoostRate[mintAddress]
      totalPercent = totalPercent.add(percent)
    }
    return totalPercent
  }, [listBoostRate, selectedNFTs.length])

  const totalBoostRate = displayBoosted.add(boostRate)

  const boostByNFT = useMemo(() => {
    if (!Number(yourAmountIn) || !debtData) return new BN(0)
    return stakedAmount
      .add(utilsBN.decimalize(yourAmountIn, decimals))
      .mul(totalBoostRate)
      .div(PRECISION)
  }, [debtData, decimals, stakedAmount, totalBoostRate, yourAmountIn])

  const totalAmountIn = useMemo(() => {
    if (!debtData) return '0'
    return utilsBN.undecimalize(
      utilsBN
        .decimalize(yourAmountIn, decimals)
        .add(stakedAmount)
        .add(boostByNFT),

      decimals,
    )
  }, [boostByNFT, debtData, decimals, stakedAmount, yourAmountIn])

  const disabled = useMemo(
    () => !Number(inAmount) || checkFinishedFarm(farmData),
    [farmData, inAmount],
  )

  const onFullyStake = async () => {
    await stake({
      farm: farmAddress,
      nfts: selectedNFTs,
      inAmount: Number(inAmount),
    })
    setInAmount('')
    setSelectedNFTs([])
  }

  const fetchListBoostRate = useCallback(async () => {
    const listBoostRate = await getListBoostRate(selectedNFTs)
    return setListBoostRate(listBoostRate)
  }, [getListBoostRate, selectedNFTs])

  useEffect(() => {
    fetchListBoostRate()
  }, [fetchListBoostRate])

  return (
    <Row gutter={[16, 16]} style={{ height: '100%' }}>
      {/* Input amount */}
      <Col span={24}>
        <CardNumbericInput
          mint={farmData.inputMint.toBase58()}
          value={inAmount}
          onChange={setInAmount}
          available={balance}
        />
      </Col>

      {/* Boosted by NFT */}
      {!!farmBoostingData.length && (
        <Fragment>
          <Col span={24}>
            <BoostingNFT
              selectedNFTs={selectedNFTs}
              setSelectedNFTs={setSelectedNFTs}
              farmAddress={farmAddress}
            />
          </Col>
          <Col span={24}>
            <Card
              bodyStyle={{ padding: 12 }}
              style={{
                boxShadow: 'none',
                borderRadius: 8,
                background: '#2D2E2D',
              }}
              bordered={false}
            >
              <Space size={8} direction="vertical" style={{ width: '100%' }}>
                {/* Staked amount */}
                <SpaceBetween
                  floatContent={
                    <Space size={6}>
                      <Typography.Text>
                        {util
                          .numeric(utilsBN.undecimalize(stakedAmount, decimals))
                          .format('0,0.[0000]')}
                      </Typography.Text>
                      <Typography.Text>
                        <MintSymbol
                          mintAddress={farmData.inputMint.toBase58()}
                        />
                      </Typography.Text>
                    </Space>
                  }
                >
                  <Typography.Text type="secondary">Staked LP</Typography.Text>
                </SpaceBetween>

                {/* Added amount */}
                <SpaceBetween
                  floatContent={
                    <Space size={6}>
                      <Typography.Text>{yourAmountIn || 0}</Typography.Text>
                      <Typography.Text>
                        <MintSymbol
                          mintAddress={farmData.inputMint.toBase58()}
                        />
                      </Typography.Text>
                    </Space>
                  }
                >
                  <Typography.Text type="secondary">LP amount</Typography.Text>
                </SpaceBetween>

                {/* Total boost rate */}
                <SpaceBetween
                  floatContent={
                    <Typography.Text style={{ color: '#A0E86F' }}>
                      {util
                        .numeric(Number(totalBoostRate) / 10 ** 9)
                        .format('0,0.[00]%')}
                    </Typography.Text>
                  }
                >
                  <Space>
                    <Typography.Text type="secondary">
                      Total boost rate
                    </Typography.Text>
                    <Tooltip title="Boost rate will be calculated based on all NFTs you lock.">
                      <IonIcon
                        style={{ cursor: 'pointer' }}
                        name="information-circle-outline"
                      />
                    </Tooltip>
                  </Space>
                </SpaceBetween>

                {/* Boosted by NFT */}
                <SpaceBetween
                  floatContent={
                    <Space size={6}>
                      <Typography.Title level={5} style={{ color: '#A0E86F' }}>
                        +
                        {util
                          .numeric(utilsBN.undecimalize(boostByNFT, decimals))
                          .format('0,0.[0000]')}
                      </Typography.Title>
                      <Typography.Title level={5} style={{ color: '#A0E86F' }}>
                        <MintSymbol
                          mintAddress={farmData.inputMint.toBase58()}
                        />
                      </Typography.Title>
                    </Space>
                  }
                >
                  <Space>
                    <Typography.Text type="secondary">
                      Boosted by NFT
                    </Typography.Text>
                    <Tooltip title="Boosted LP = (Staked LP + LP amount) * Total boost rate)">
                      <IonIcon
                        style={{ cursor: 'pointer' }}
                        name="information-circle-outline"
                      />
                    </Tooltip>
                  </Space>
                </SpaceBetween>
                {/* Total staked */}
                <SpaceBetween
                  floatContent={
                    <Space size={6}>
                      <Typography.Title level={5}>
                        {util.numeric(totalAmountIn).format('0,0.[0000]')}
                      </Typography.Title>
                      <Typography.Title level={5}>
                        <MintSymbol
                          mintAddress={farmData.inputMint.toBase58()}
                        />
                      </Typography.Title>
                    </Space>
                  }
                >
                  <Typography.Text type="secondary">Total</Typography.Text>
                </SpaceBetween>
                <Typography.Text className="caption" type="secondary">
                  *Total = Staked LP + LP amount + Boosted LP
                </Typography.Text>
              </Space>
            </Card>
          </Col>
        </Fragment>
      )}
      {/* Action */}
      <Col span={24}>
        <Button
          size="large"
          type="primary"
          block
          disabled={disabled}
          loading={loading}
          onClick={onFullyStake}
        >
          {!Number(inAmount) ? 'Enter an amount' : 'Stake'}
        </Button>
      </Col>
      <Col span={24} style={{ textAlign: 'center' }}>
        <Typography.Title
          style={{ cursor: 'pointer', color: '#A0E86F' }}
          onClick={onGetToken}
          level={5}
        >
          Get {<MintSymbol mintAddress={farmData.inputMint.toBase58()} />} to
          deposit
        </Typography.Title>
      </Col>
    </Row>
  )
}

export default Stake
