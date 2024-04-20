import { useState, useEffect } from 'react'
import '../css/cryptoApi.css'

// API Key

const cryptoApiKey = 'CG-aUMCTa9KS1trBrKPu1iip2q8'

export function CryptoApi() {
  const [crytoMappedApi, setCrytoMappedApi] = useState<CryptoMappedImagesType>()

  //   type validation for tsx

  type CryptoMappedImagesType = [
    {
      id: string
      symbol: string
      name: string
      image: undefined
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
      roi: {} | null
      last_updated: string
    },
  ]

  useEffect(() => {
    async function cryptoCatagoriesImgFetch() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        )

        const data = await response.json()

        setCrytoMappedApi(data)
        console.log(response)
        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    cryptoCatagoriesImgFetch()
  }, [])

  return (
    <>
      <div className="flex flex-col items-end">
        {crytoMappedApi?.map((cryptos, index) => (
          <>
            <div className="flex items-center">
              <h3 className="text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <img
                src={cryptos.image}
                className="crytoImageHeight object-contain capitalize p-7"
                alt={`${cryptos.symbol}.`}
                title={cryptos.id}
              />
            </div>
            <div className="block mx-auto">
              <p className="text-center">{cryptos.id}</p>
            </div>
            <hr />
          </>
        ))}
      </div>
    </>
  )
}
