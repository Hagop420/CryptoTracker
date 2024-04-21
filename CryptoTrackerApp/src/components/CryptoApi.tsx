import { useState, useEffect, useRef, forwardRef } from 'react'
import tippy, { Content } from 'tippy.js'
import 'tippy.js/dist/tippy.css' // Import Tippy.js CSS
import 'animate.css'
import 'tippy.js/themes/translucent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import '../css/cryptoApi.css'
import React from 'react'

// API Key

// const cryptoApiKey = 'CG-aUMCTa9KS1trBrKPu1iip2q8'

export function CryptoApi() {
  //   type validation for tsx

  type CryptoMappedImagesType = {
    ref: any
    tooltipContent: Content | undefined
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
  }

  const [crytoMappedApi, setCrytoMappedApi] = useState<
    CryptoMappedImagesType[]
  >([])

  // FUNCTION FOR FORMATTING NUMBERS

  // Function to format prices
  const formatPrice = (price: number): string => {
    let formattedPrice: string = (Math.round(price * 100) / 100).toFixed(2)

    // Check if the price is greater than 999
    if (+formattedPrice > 999) {
      // Format the price with commas
      formattedPrice = formattedPrice.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return `$${formattedPrice}`
  }

  // API CALL 1

  useEffect(() => {
    async function cryptoCatagoriesImgFetch() {
      try {
        const response = await fetch(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd',
        )

        const data = await response.json()

        setCrytoMappedApi(data)

        console.log(data)
      } catch (err) {
        console.log(err)
      }
    }
    cryptoCatagoriesImgFetch()
  }, [])

  // Function to determine arrow color based on percentage change
  const arrowColor = (percentageChange: number): string => {
    return percentageChange >= 0 ? '#33ff99' : '#ff3333'
  }

  const buttonRefs = useRef<Array<React.RefObject<HTMLButtonElement>>>([])

  //   const MyFontAwesomeIcon = forwardRef((props, ref) => (
  //    <FontAwesomeIcon {...props} ref={ref} />
  //  ));

  useEffect(() => {
    // Initialize tooltips once data is fetched and rendered
    crytoMappedApi.forEach((_, index) => {
      // Ensure the buttonRefs array has enough space for all buttons
      if (!buttonRefs.current[index]) {
        buttonRefs.current[index] = React.createRef<HTMLButtonElement>()
      }
    })

    // Filter out null values from buttonRefs.current array
    const validButtonRefs = buttonRefs.current.filter(
      (ref) => ref.current !== null,
    )

    validButtonRefs.forEach((buttonRef) => {
      tippy(buttonRef.current!, {
        content: 'Remember',
        placement: 'top',
        animation: 'rubberBand',
        theme: 'translucent',
      })

      // console.log('Tooltip Instance:', tooltipInstance)
    })
  }, [crytoMappedApi])

  return (
    <>
      <div className="grid grid-cols-2">
        {/* Use the buttonRef for the button element */}
        {crytoMappedApi?.map((cryptos, index) => (
          <>
            <div className="border-2 p-2">
              <h3 className="flex px-3 text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <div
                className="flex flex-col justify-start items-center"
                key={index}
              >
                <span
                  className="bg-transparent"
                  ref={buttonRefs.current[index]}
                >
                  <FontAwesomeIcon
                    key={index}
                    icon={farStar}
                    className="m-2 starSize hover:cursor-pointer"
                  />
                </span>
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
                {/* {`$${(
                  Math.round(cryptos.current_price * 100) / 100
                ).toString()}`} */}
                {formatPrice(cryptos.current_price)}{' '}
              </p>
              <div className="flex flex-col items-center p-4">
                <h3>24h:</h3>
                <p
                  style={{
                    color: arrowColor(cryptos.price_change_percentage_24h),
                  }}
                >
                  {cryptos.price_change_percentage_24h > 0 ? (
                    <svg
                      className="mx-auto"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="text-green-400"
                        d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="mx-auto"
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="text-red-400"
                        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                      ></path>
                    </svg>
                  )}
                  {cryptos.price_change_percentage_24h}%
                </p>
              </div>

              <div className="flex flex-col items-center p-4">
                <h3>1W:</h3>
                <p
                  style={{
                    color: arrowColor(cryptos.market_cap_change_percentage_24h),
                  }}
                >
                  {cryptos.market_cap_change_percentage_24h > 0 ? (
                    <svg
                      className="mx-auto"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="text-green-400"
                        d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      className="mx-auto"
                      stroke="currentColor"
                      fill="currentColor"
                      stroke-width="0"
                      viewBox="0 0 320 512"
                      height="1em"
                      width="1em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        className="text-red-400"
                        d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"
                      ></path>
                    </svg>
                  )}
                  {(cryptos.price_change_percentage_24h * 7) / 2}%
                </p>
              </div>
            </div>
            <hr className="hidden" />
          </>
        ))}
      </div>
    </>
  )
}
