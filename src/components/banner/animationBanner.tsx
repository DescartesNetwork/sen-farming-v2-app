import { Image } from 'antd'

const img1 =
  'https://descartesnetwork.github.io/anyarts.so/static/asset/panel1.1c75bf804b1e10e8.png'
// const img2 =
// 'https://descartesnetwork.github.io/defiland-iframe/static/asset/panel-1.948017c921884130.png'

const AnimationBanner = () => {
  return (
    <div className="animation-banner">
      <Image src={img1} />
      {[1, 2, 3].map((item) => (
        <div className={`token token-${item}`} key={item} />
      ))}
      <div className="hammer" />
    </div>
  )
}

export default AnimationBanner
