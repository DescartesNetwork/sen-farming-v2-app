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
  H2yaxdyK6bzUgse1QZTFPaiMif8DeQ2xRjdQomk21PA7: {
    balansol: {
      url: 'https://hub.sentre.io/app/balansol/details?pool=AzPdQteHNWLvgRtFQX2N9K2U14M7rwub4VjEeKhaSbuh&autoInstall=true',
      description: 'Deposit on Balansol',
      icon: 'https://descartesnetwork.github.io/balansol/static/asset/logo.f98afe9edf28d217.png',
      recommend: true,
    },
  },
  G3zNkbv4AUVS3NdvCp9HeYNEF7DBWHKskXXfdUrMARK9: {
    balansol: {
      url: 'https://hub.sentre.io/app/balansol/details?pool=CT2QmamF6kBBDVbkg8WkvF5gnq6q8mDranPi21tdGeeL&autoInstall=true',
      description: 'Deposit on Balansol',
      icon: 'https://descartesnetwork.github.io/balansol/static/asset/logo.f98afe9edf28d217.png',
      recommend: true,
    },
  },
  // not support number at the first character
  '8zzV8kkfv9amN3UA3g4fKtDzd79td2krc3VMy5CZo275': {
    balansol: {
      url: 'https://hub.sentre.io/app/balansol/details?pool=2gtDG2iYam6z4eCjx9yfBD7ayRXQGTDymjqQLiHqr7Z6&autoInstall=true',
      description: 'Deposit on Balansol',
      icon: 'https://descartesnetwork.github.io/balansol/static/asset/logo.f98afe9edf28d217.png',
      recommend: true,
    },
  },
  FsPncBfeDV3Uv9g6yyx1NnKidvUeCaAiT2NtBAPy17xg: {
    penguin: {
      url: 'https://app.png.fi/swap/SOL_XGLI',
      description: 'Swap on PENGUIN Finance',
      icon: 'https://app.png.fi/favicon.ico',
      recommend: true,
    },
    balansol: {
      url: 'https://hub.sentre.io/app/balansol/swap?bid_mint=So11111111111111111111111111111111111111112&ask_mint=FsPncBfeDV3Uv9g6yyx1NnKidvUeCaAiT2NtBAPy17xg&autoInstall=true',
      description: 'Swap on Balansol',
      icon: 'https://descartesnetwork.github.io/balansol/static/asset/logo.f98afe9edf28d217.png',
    },
  },
}
