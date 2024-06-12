import { createContext } from 'react'

export type US_currency = {
  length?: number
  favorite?: boolean
  filter?(arg0: (quote: US_currency) => boolean): US_currency[]
  rank?: number
  id: string
  symbol?: string
  name: string
  cryptoFav: US_currency
  image: string
  current_price: number
  market_cap: number
  market_cap_rank: number
  fully_diluted_valuation: number
  total_volume: number
  high_24h: number
  low_24h: number
  price_change_24h: number
  price_change_percentage_24h: number
  market_cap_change_24h: number
  market_cap_change_percentage_24h: number
  circulating_supply: number
  total_supply: number
  max_supply: number
  ath: number
  ath_change_percentage: number
  ath_date: string
  atl: number
  atl_change_percentage: number
  atl_date: string
  roi: null
  last_updated: string
}

export type cryptocurrencyUsContext = {
  currencyItem: US_currency[]
  setItemFavoriteCrypto: (cryptoItem: US_currency) => void
  setStoredFavorite: () => void
  // imageContentStored: US_currency | undefined
}

export const cryptoContext = createContext<cryptocurrencyUsContext>({
  currencyItem: [],
  setItemFavoriteCrypto: () => undefined,
  setStoredFavorite: () => undefined,
})

export const CryptoProvider = cryptoContext.Provider
