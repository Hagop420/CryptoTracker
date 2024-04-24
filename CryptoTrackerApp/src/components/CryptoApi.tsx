import { useState, useEffect, useRef, forwardRef } from 'react'
import { LightAndDarkMode } from './Navbar'
import tippy, { Content } from 'tippy.js'
import 'tippy.js/dist/tippy.css' // Import Tippy.js CSS
import 'animate.css'
import 'tippy.js/themes/translucent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import '../css/cryptoApi.css'
import React from 'react'
import { FaArrowAltCircleDown } from 'react-icons/fa'

// API Key

// const cryptoApiKey = 'CG-aUMCTa9KS1trBrKPu1iip2q8'

export function CryptoApi() {
  //   type validation for tsx

  type CryptoMappedImagesType = {
    id: string
    symbol: string
    name: string
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

  function getFirstTwoDecimalNumbers(num: number): number {
    // Convert the number to a string with two decimal places using toFixed
    const truncatedString: string = num.toFixed(2)
    // Parse the truncated string back to a number
    const truncatedNumber: number = parseFloat(truncatedString)
    return truncatedNumber
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

  const buttonRefs = useRef<Array<React.RefObject<HTMLButtonElement>>>([])

  useEffect(() => {
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
        theme: 'translucent',
        // Additional options as needed
        appendTo: () => document.body, // Ensuring the tooltip is appended to body
        allowHTML: true, // Allow HTML content in the tooltip
        onShow(instance) {
          // Adding a custom class to the tooltip content
          const tooltipContent = instance.popper?.querySelector(
            '.tippy-content',
          )

          if (tooltipContent) {
            const currentTheme = document.documentElement.getAttribute(
              'data-theme',
            )
            const tooltipBubble = instance.popper
            if (currentTheme === 'light') {
              ;(tooltipContent as HTMLElement).style.color = '#fff'
              ;(tooltipContent as HTMLElement).style.fontWeight = '#000'
            } else {
              // ;(tooltipContent as HTMLElement).parentNode.style.background ===
              //   '#fff'
              ;(tooltipContent as HTMLElement).style.color = 'orange'
              ;(tooltipContent as HTMLElement).style.fontWeight = 'bold'
              ;(tooltipContent as HTMLElement).style.background = '#fff'
            }
          }
        },
      })
    })
  }, [crytoMappedApi])

  return (
    <>
      <LightAndDarkMode />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:hidden">
        {/* Use the buttonRef for the button element */}
        {crytoMappedApi?.map((cryptos, index) => (
          <>
            <div className="border-2 p-2 BC MHIGHT" key={index}>
              <h3 className="flex px-3 text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <div className="flex flex-col justify-start items-center">
                <span
                  className={`bg-transparent text-color ST`}
                  ref={buttonRefs.current[index]}
                >
                  <FontAwesomeIcon
                    key={index}
                    icon={farStar}
                    className="m-2 starSize hover:cursor-pointer"
                  />
                </span>

                <p className="capitalize first-letter:text-yellow-500 first-letter:font-bold CN">
                  coin:
                </p>
                <img
                  src={cryptos.image}
                  className="crytoImageHeight object-contain capitalize p-7"
                  alt={`${cryptos.symbol}.`}
                  title={cryptos.id}
                />
              </div>
              <p className="text-center capitalize font-bold p-1 ST">
                {cryptos.id}
              </p>
              <small className="text-center capitalize font-light ST">
                {`(${cryptos.symbol})`}
              </small>
              <h3 className="capitalize m-2 ST">current price:</h3>
              <p className="text-center capitalize font-bold ST">
                {formatPrice(cryptos.current_price)}{' '}
              </p>
              <div className="flex flex-col items-center p-4">
                <h3 className="ST">24h:</h3>
                {(cryptos.price_change_24h / 2) * 100 >=
                  cryptos.market_cap_change_percentage_24h ||
                (cryptos.price_change_24h / 2) * 100 <=
                  cryptos.market_cap_change_percentage_24h ? (
                  <>
                    <p className="text-green-400">
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
                      {getFirstTwoDecimalNumbers(
                        cryptos.price_change_percentage_24h,
                      )}
                      %
                    </p>
                  </>
                ) : (
                  <>
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
                    <p className="text-green-400">
                      {getFirstTwoDecimalNumbers(
                        cryptos.price_change_percentage_24h,
                      )}
                      %
                    </p>
                  </>
                )}
              </div>

              <div className="flex flex-col items-center p-4">
                <h3 className="ST">1W:</h3>
                <p>
                  {cryptos.price_change_24h - 7 / 2 <=
                  cryptos.market_cap_change_percentage_24h ? (
                    <>
                      <p className="text-red-400">
                        <svg
                          className="mx-auto text-red-400"
                          stroke="currentColor"
                          fill="currentColor"
                          stroke-width="0"
                          viewBox="0 0 320 512"
                          height="1em"
                          width="1em"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path d="M137.4 374.6c12.5 12.5 32.8 12.5 45.3 0l128-128c9.2-9.2 11.9-22.9 6.9-34.9s-16.6-19.8-29.6-19.8L32 192c-12.9 0-24.6 7.8-29.6 19.8s-2.2 25.7 6.9 34.9l128 128z"></path>
                        </svg>
                        {getFirstTwoDecimalNumbers(
                          cryptos.price_change_percentage_24h / 3.5,
                        )}
                        %
                      </p>
                    </>
                  ) : (
                    <>
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        className="mx-auto text-green-400"
                        stroke-width="0"
                        viewBox="0 0 320 512"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M182.6 137.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-9.2 9.2-11.9 22.9-6.9 34.9s16.6 19.8 29.6 19.8H288c12.9 0 24.6-7.8 29.6-19.8s2.2-25.7-6.9-34.9l-128-128z"></path>
                      </svg>
                      <p className="text-green-400 font-bold">
                        {getFirstTwoDecimalNumbers(
                          cryptos.price_change_percentage_24h / 3.5,
                        )}
                        %
                      </p>
                    </>
                  )}
                </p>
                <div>
                  <span className="ST">
                    <FaArrowAltCircleDown />
                  </span>
                </div>
                <h2 className="capitalize p-2 ST">24h volume</h2>
                <p className="ST">{formatPrice(cryptos.total_volume)}</p>
              </div>
              <h2 className="capitalize p-2 ST">Market cap</h2>
              <p className="ST">{formatPrice(cryptos.market_cap)}</p>
            </div>
            <hr className="hidden" />
          </>
        ))}
      </div>
      {/* END VIEWPORT 1 */}
      <table className="flex flex-col">
        <hr />
        <div>
          <tr className="flex justify-around m-2 capitalize mx-auto">
            <th>#</th>
            <th className="ST text-2xl ml-9 text-center first-letter:text-yellow-500">
              coin
            </th>
            <hr className="invisible" />
            <th className="ST text-2xl">price</th>
            <th className="ST text-2xl">24h</th>
            <th className="ST text-2xl">1W</th>
            <th className="ST text-2xl">24h volume</th>
            <th className="ST text-2xl">market cap</th>
          </tr>
        </div>
        <hr className="p-2" />
        {crytoMappedApi.map((cryptoTBLEData, index) => (
          <div>
            <tr className="flex justify-around m-2 capitalize mx-auto">
              <>
                <h1>hihhkjZz</h1>
                <h1>hihhkjZz</h1>
                <h1>hihhkjZz</h1>
                <h1>hihhkjZz</h1>
                <h1>hihhkjZz</h1>
                <h1>hihhkjZz</h1>
              </>
            </tr>
          </div>
        ))}
      </table>
    </>
  )
}

// {crytoMappedApi.map((cryptoTBLE) => (
//   <img src={cryptoTBLE.image} alt="" />
// ))}
