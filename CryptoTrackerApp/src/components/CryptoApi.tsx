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
      price_change_percentage_24h_in_currency: number
    },
  ]

  // API CALL 1

  useEffect(() => {
    async function cryptoCatagoriesImgFetch() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        )

        const data = await response.json()

        setCrytoMappedApi(data)
        //   console.log(response)
        //   console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    cryptoCatagoriesImgFetch()
  }, [])

  return (
    <>
      <div className="grid grid-cols-2">
        {crytoMappedApi?.map((cryptos, index) => (
          <>
            <div className="border-2 p-2">
              <h3 className="flex px-3 text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <div
                className="flex flex-col justify-start items-center"
                key={index}
              >
                <p className="capitalize first-letter:text-yellow-500 first-letter:font-bold">
                  coin:
                </p>
                <img
                  src={cryptos.image}
                  className="crytoImageHeight object-contain capitalize p-7"
                  alt={`${cryptos.symbol}.`}
                  title={cryptos.id}
                />
              </div>
              <p className="text-center capitalize font-bold p-1">
                {cryptos.id}
              </p>
              <small className="text-center capitalize font-light">
                {`(${cryptos.symbol})`}
              </small>
              <h3 className="capitalize m-2">current price:</h3>
              <p className="text-center capitalize font-bold">
                {`$${(
                  Math.round(cryptos.current_price * 100) / 100
                ).toString()}`}
              </p>
              <div className="flex flex-col items-center p-4">
                <h3 className="text-red-500">24h:</h3>
                <p></p>
                <p className="text-red-500">{cryptos.low_24h}</p>
              </div>
            </div>
            <hr className="hidden" />
          </>
        ))}
      </div>
    </>
  )
}
