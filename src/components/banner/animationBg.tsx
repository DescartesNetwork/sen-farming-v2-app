import token1 from 'static/images/token-1.svg'
import token2 from 'static/images/token-2.svg'

const MINING_IMGS = [token1, token2]

const AnimationBg = () => {
  return (
    <div className="wrap-animation mining">
      {MINING_IMGS.map((img, idx) => (
        <div key={idx} className={`item-bounce bounce-${idx + 1}`}>
          <img src={img} alt={`coin-${idx}`} />
        </div>
      ))}
    </div>
  )
}

export default AnimationBg
