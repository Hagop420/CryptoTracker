import { useState, useEffect, useRef, forwardRef, ChangeEvent } from 'react'
import { LightAndDarkMode } from './Navbar'
// import { SearchableList } from './SearchableFilter'
import tippy, { Content } from 'tippy.js'
import 'tippy.js/dist/tippy.css' // Import Tippy.js CSS
import 'animate.css'
import 'tippy.js/themes/translucent.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar as farStar } from '@fortawesome/free-regular-svg-icons'
import '../css/cryptoApi.css'
import noBtcWH from '../assets/img/noBtcWH.jpg'
import noBtcBL from '../assets/img/noBtcBL.gif'
import noEntry from '../assets/img/noE.png'
import React from 'react'
import { FaArrowAltCircleDown } from 'react-icons/fa'
import { RiH1 } from 'react-icons/ri'

// API Key

// const cryptoApiKey = 'CG-aUMCTa9KS1trBrKPu1iip2q8'

export type CryptoMappedImagesType = {
  length: number
  filter(
    arg0: (quote: CryptoMappedImagesType) => boolean,
  ): CryptoMappedImagesType[]
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

export function CryptoApi() {
  //   type validation for tsx

  const [crytoMappedApi, setCrytoMappedApi] = useState<
    CryptoMappedImagesType[]
  >([])

  // filter state

  const [filter, setFilter] = useState<string>('')

  const [inpReq, setInpReq] = useState<any>('')

  // Filtered data based on the filter state
  const filteredData = crytoMappedApi.filter((item) =>
    item.id.toLowerCase().includes(filter.toLowerCase()),
  )

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

  const buttonRefs = useRef<Array<React.RefObject<HTMLDivElement>>>([])

  useEffect(() => {
    filteredData.forEach((_, index) => {
      // Ensure the buttonRefs array has enough space for all buttons
      if (!buttonRefs.current[index]) {
        buttonRefs.current[index] = React.createRef<HTMLDivElement>()
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
            if (currentTheme === 'light') {
              ;(tooltipContent as HTMLElement).style.color = '#fff'
              ;(tooltipContent as HTMLElement).style.fontWeight = '#000'
            } else {
              // ;(tooltipContent as HTMLElement).parentNode.style.background ===
              //   '#fff'
              ;(tooltipContent as HTMLElement).style.color = '#000'
              ;(tooltipContent as HTMLElement).style.fontWeight = 'bold'
              ;(tooltipContent as HTMLElement).style.background = '#fff'
            }
          }
        },
      })
    })
  }, [filteredData])

  // effect for the warning on top of the input

  const warning_refrence_A = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function warning_animation_functionallity() {
      if (!warning_refrence_A.current) return

      const warnDiv = document.querySelector('.warn_anim')
      if (warnDiv === null) return

      const warnDivPos = warnDiv.getBoundingClientRect().top
      const viewportHeight = window.innerHeight

      if (warnDivPos < viewportHeight) {
        warnDiv.classList.add('warn_anim_appeared')
      }

      // const about_image = document.querySelector('.warn_anim')
      // const image_animation_function_pos = about_image?.getBoundingClientRect()
      //   .top

      // const screenImagePosition = window.innerHeight
      // if (image_animation_function_pos === undefined) return
      // if (about_image === null) return

      // if (image_animation_function_pos < screenImagePosition) {
      //   about_image.classList.add('warn_anim_appeared')
      // }
    }

    // Call the animation function immediately when the component mounts
    // warning_animation_functionallity()

    // Add scroll event listener
    window.addEventListener('load', warning_animation_functionallity)

    // Cleanup function to remove the event listener
    // return () => {
    //   window.removeEventListener('scroll', warning_animation_functionallity)
    // }
  }, [])

  // white space regular ex.
  const regexInp = /^\s*$/

  // length of input is no more than 15
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (value.length <= 21) {
      setFilter(value)
    }
    if (regexInp.test(value)) {
      setFilter('')
    }
    if (!regexInp.test(value)) {
      setInpReq('')
    }

    if (value.length === 0) {
      setInpReq('')
    }

    if (regexInp.test(value)) {
      setTimeout(() => {
        setInpReq('No starting empty space allowed')
      }, 1000)
    }
  }

  return (
    <>
      <div className="">
        <LightAndDarkMode />
      </div>
      <div className="flex flex-col items-center">
        <p
          onChange={handleFilterChange}
          className="warn_anim p-1"
          ref={warning_refrence_A}
        >
          {inpReq}
        </p>
      </div>
      {/* filter input */}
      <div className="m-7">
        <input
          type="text"
          placeholder="Crypto search..."
          value={filter}
          className={
            filter.length > 0
              ? 'form-control mx-auto w-96 bg-yellow-400 text-black placeholder:text-black placeholder:p-5 p-1 rounded font-bold'
              : 'form-control mx-auto w-96 bg-yellow-400 text-black placeholder:text-black placeholder:p-5 p-1 border-2 rounded font-bold search'
          }
          onChange={handleFilterChange}
        />
      </div>
      {/* end filtering input */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:hidden">
        {/* Use the buttonRef for the button element */}

        {filteredData?.map((cryptos, index) => (
          <>
            <div className="border-2 BC MHIGHT" key={index}>
              <h3 className="flex px-3 text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <div className="flex flex-col justify-start items-center">
                <div
                  className={`bg-transparent text-color border-0 ST`}
                  ref={buttonRefs.current[index]}
                >
                  <FontAwesomeIcon
                    key={index}
                    icon={farStar}
                    className="m-2 starSize hover:cursor-pointer"
                  />
                </div>

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
      <table className="hidden TBLgr xl:flex xl:flex-col">
        <hr
          className={
            regexInp.test(filter)
              ? 'flex justify-around m-2 capitalize mx-auto'
              : 'hidden'
          }
        />
        <div>
          <tr
            className={
              regexInp.test(filter)
                ? 'flex justify-around m-2 capitalize mx-auto'
                : 'hidden'
            }
          >
            <th>#</th>
            <th className="ST text-2xl text-center first-letter:text-yellow-500">
              coin
            </th>
            <hr className="invisible" />
            <th className="ST text-2xl">current price</th>
            <th className="ST text-2xl">24h</th>
            <th className="ST text-2xl">1W</th>
            <th className="ST text-2xl">24h volume</th>
            <th className="ST text-2xl">market cap</th>
          </tr>
        </div>
        <hr
          className={
            regexInp.test(filter)
              ? 'flex justify-around m-2 capitalize mx-auto'
              : 'hidden'
          }
        />
        {filteredData.map((cryptoTBLEData, index) => (
          <>
            <tr key={index}>
              <div>
                <tr className="flex justify-around capitalize mx-auto m-1">
                  <span
                    className={`bg-transparent text-color ST`}
                    ref={buttonRefs.current[index]}
                  >
                    <FontAwesomeIcon
                      key={index}
                      icon={farStar}
                      className="mt-2 starSize hover:cursor-pointer"
                    />
                  </span>
                  <div className="flex items-center">
                    <p className="">{`${cryptoTBLEData.market_cap_rank})`}</p>
                    <div className="block">
                      <img
                        src={cryptoTBLEData.image}
                        alt={`${cryptoTBLEData.symbol}.`}
                        className="h-14 p-2 pl-3"
                        title={cryptoTBLEData.id}
                      />
                    </div>
                  </div>

                  <hr className="invisible" />
                  <p className="ST text-2xl">
                    {formatPrice(cryptoTBLEData.current_price)}{' '}
                  </p>
                  <td className="ST">
                    {(cryptoTBLEData.price_change_24h / 2) * 100 >=
                      cryptoTBLEData.market_cap_change_percentage_24h ||
                    (cryptoTBLEData.price_change_24h / 2) * 100 <=
                      cryptoTBLEData.market_cap_change_percentage_24h ? (
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
                            cryptoTBLEData.price_change_percentage_24h,
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
                            cryptoTBLEData.price_change_percentage_24h,
                          )}
                          %
                        </p>
                      </>
                    )}
                  </td>
                  <td className="ST">
                    {cryptoTBLEData.price_change_24h - 7 / 2 <=
                    cryptoTBLEData.market_cap_change_percentage_24h ? (
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
                            cryptoTBLEData.price_change_percentage_24h / 3.5,
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
                            cryptoTBLEData.price_change_percentage_24h / 3.5,
                          )}
                          %
                        </p>
                      </>
                    )}
                  </td>
                  <p className="ST">
                    {formatPrice(cryptoTBLEData.total_volume)}
                  </p>
                  <p className="ST">{formatPrice(cryptoTBLEData.market_cap)}</p>
                </tr>
              </div>
              <hr className="" />
            </tr>
          </>
        ))}
      </table>
      {filteredData.length === 0 && (
        <>
          <div className="flex justify-center items-center flex-col mt-20">
            {filter.length > 20 ? (
              <div className="flex flex-col m-auto items-center">
                <img src={noEntry} className="btcBL" alt="" />
                <p className="m-3 text-2xl">Maximum character's reached</p>
              </div>
            ) : (
              <div className="text-2xl">
                <img
                  src={noBtcBL}
                  className={regexInp.test(filter) ? 'hidden' : 'btcBL'}
                  alt=""
                />
                <h2 className={regexInp.test(filter) ? 'hidden' : 'm-3'}>
                  "{filter}"
                </h2>
                <p className={regexInp.test(filter) ? 'hidden' : 'm-3'}>
                  Currency not found
                </p>
              </div>
            )}

            {/* {regexInp.test(filter) ? <p>x</p> : <p>ssxxsfdfd</p>} */}
          </div>
        </>
      )}
      {/* {filter.length > 15 && (
        <>
          <div className="flex justify-center items-center flex-col">
            <img src={noEntry} className="btcBL" alt="" />
          </div>
          <div className="flex flex-col items-center mx-auto m-auto text-center justify-center">
            <h1>Maximum </h1>
          </div>
        </>
      )} */}
    </>
  )
}

// {crytoMappedApi.map((cryptoTBLE) => (
//   <img src={cryptoTBLE.image} alt="" />
// ))}
