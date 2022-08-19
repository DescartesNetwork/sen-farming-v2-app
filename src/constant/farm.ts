export type FARM_TOKEN = {
  url: string
  description: string
  icon: string
  recommend?: boolean
}
export const FARM_GET_TOKENS: Record<string, { [x: string]: FARM_TOKEN }> = {
  xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms: {
    balansol: {
      url: 'https://hub.sentre.io/app/balansol/swap?bid_mint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&ask_mint=xALGoH1zUfRmpCriy94qbfoMXHtK6NDnMKzT4Xdvgms&autoInstall=true',
      description: 'Swap on Balansol',
      icon: 'https://descartesnetwork.github.io/balansol/static/asset/logo.f98afe9edf28d217.png',
    },
    glitterfinance: {
      url: 'https://bridge.glitterfinance.org/',
      description: 'Bridge on Glitter Finances',
      icon: 'https://bridge.glitterfinance.org/static/media/circles-anim.f512ffe5.svg',
      recommend: true,
    },
  },
  SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M: {
    balansol: {
      url: 'https://hub.sentre.io/app/balansol/swap?bid_mint=EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v&ask_mint=SENBBKVCM7homnf5RX9zqpf1GFe935hnbU4uVzY1Y6M&autoInstall=true',
      description: 'Swap on Balansol',
      icon: 'https://descartesnetwork.github.io/balansol/static/asset/logo.f98afe9edf28d217.png',
      recommend: true,
    },
    gate: {
      url: 'https://www.gate.io/trade/SNTR_USDT',
      description: 'Buy on Gate.io',
      icon: 'https://www.gate.io/favicon.ico?v=2.0',
    },
  },
}
