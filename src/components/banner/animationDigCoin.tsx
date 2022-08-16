import { Image } from 'antd'

const img2 =
  'https://descartesnetwork.github.io/defiland-iframe/static/asset/panel-1.948017c921884130.png'
// Animation dig coin. no use it for now
const AnimationBanner = () => {
  return (
    <div className="animation-banner">
      <Image src={img2} />
      {[1, 2].map((item) => (
        <div className={`token token-${item}`} key={item} />
      ))}
      <div className="token hammer" />
    </div>
  )
}

export default AnimationBanner
