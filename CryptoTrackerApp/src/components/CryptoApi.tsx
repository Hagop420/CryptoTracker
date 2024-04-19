import { useState, useEffect } from 'react'
// API Key

const cryptoApiKey = 'CG-cau3wxcR1wSjs9iw2Uv6V8Up'

export function CryptoApi() {
  const [crytoMappedApi, setCrytoMappedApi] = useState<CryptoMappedImagesType>()

  //   type

  type CryptoMappedImagesType = [
    {
      content: string
      id: string
      market_cap: number
      market_cap_change_24h: number
      name: string
      top_3_coins: string[]
      updated_at: string
      volume_24th: string
    },
  ]

  useEffect(() => {
    async function cryptoCatagoriesImgFetch() {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/categories?order=market_cap_desc `,
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
      {/* <div className="hidden">
        {crytoMappedApi?.map((crytos, index) => (
          <img key={index} src={crytos.top_3_coins[0]} alt="" />
        ))}
      </div> */}

      <h1 className="text-blue-500">dwjsk</h1>
    </>
  )
}
