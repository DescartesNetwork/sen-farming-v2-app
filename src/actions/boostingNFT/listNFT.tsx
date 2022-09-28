import { useMemo } from 'react'
import { util } from '@sentre/senhub'

import { MintName } from '@sen-use/app'
import { List, Space, Typography } from 'antd'

import { useFarmBoosting } from 'hooks/farm/useFarmBoosting'
import { useGetNFTSymbol } from 'hooks/boost/useGetNFTSymbol'

type CollectionProps = {
  farmAddress: string
}

const ListNFT = ({ farmAddress }: CollectionProps) => {
  const getSymbolCollection = useGetNFTSymbol()
  const farmBoostingData = useFarmBoosting(farmAddress)

  const collections = useMemo(
    () =>
      farmBoostingData.map(({ boostingCollection, boostingCoefficient }) => ({
        address: boostingCollection.toBase58(),
        percent: boostingCoefficient,
      })),
    [farmBoostingData],
  )

  const onCheckNFT = async (mintAddress: string) => {
    const symbol = await getSymbolCollection(mintAddress)
    if (!symbol) return
    return window.open(
      `https://hub.sentre.io/app/any_arts/${symbol}?autoInstall=true`,
      '_blank',
    )
  }

  return (
    <List
      itemLayout="horizontal"
      dataSource={collections}
      renderItem={({ address, percent }) => (
        <List.Item>
          <Space
            style={{ cursor: 'pointer' }}
            size={8}
            onClick={() => onCheckNFT(address)}
          >
            <Typography.Text>&#x2022;</Typography.Text>
            <Typography.Text style={{ textDecoration: 'underline' }}>
              <MintName mintAddress={address} />:{' '}
              <span style={{ color: '#A0E86F' }}>
                {util.numeric(percent.toNumber() / 10 ** 9).format('0,0.[00]%')}
              </span>
            </Typography.Text>
          </Space>
        </List.Item>
      )}
    />
  )
}

export default ListNFT
