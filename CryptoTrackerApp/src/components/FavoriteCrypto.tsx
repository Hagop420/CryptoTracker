import { useCurrency } from '/Users/hbamb420/CryptoTracker/CryptoTrackerApp/lib/useCurrency.tsx'
import { US_currency } from './CryptoProvider'
import noCryptosSelected from '../assets/img/noCryptos.png'
import { LightAndDarkMode } from './Navbar'
import { useEffect } from 'react'
import { FaArrowAltCircleDown, FaCross } from 'react-icons/fa'
import { FaX } from 'react-icons/fa6'
import '../css/cryptoApi.css'

type CryptoStoringImagesAndContentProp = {
  currency: US_currency[]
}

export function FavoriteCrypto({
  currency,
}: CryptoStoringImagesAndContentProp) {
  const { setStoredFavorite } = useCurrency()

  // get my local storage items
  useEffect(() => {
    setStoredFavorite()
  }, [])

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

  if (currency.length === 0) {
    return (
      <>
        <div>
          <LightAndDarkMode />
        </div>
        <div className="flex flex-col items-center text-center mx-auto justify-center">
          <h2
            className="flex FST_BL items-center text-1xl m-5 sm:flex sm:items-center sm:text-2xl sm:m-5 
          md:flex md:items-center md:text-3xl md:m-5 lg:flex lg:items-center lg:text-4xl lg:m-5 xl:flex xl:items-center xl:text-4xl xl:m-5"
          >
            No currency(s) Selected at this time
            <FaX />
          </h2>
          <img src={noCryptosSelected} alt="" />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="top-0 relative">
        <LightAndDarkMode />
      </div>

      <h1 className="text-center FST_BL text-black WH">Cryptos to Purchase</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:hidden">
        {/* Use the buttonRef for the button element */}

        {currency?.map((cryptos, index) => (
          <>
            <div className="border-2 BC MHIGHT" key={index}>
              <h3 className="flex px-3 text-2xl">{`${cryptos.market_cap_rank})`}</h3>
              <div className="flex flex-col justify-start items-center">
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
                {(cryptos.price_change_24h / 1440) * 100 <
                  cryptos.market_cap_change_percentage_24h ||
                cryptos.price_change_24h * 100 <=
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
                    <p className="text-red-400">
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

      <table className="hidden TBLgr xl:flex xl:flex-col">
        {currency.map((cryptoTBLEData, index) => (
          <>
            <tr key={index}>
              <div>
                <tr className="flex justify-around capitalize mx-auto m-1 items-center">
                  <div className="flex items-center">
                    <p className="Blvk">{`${cryptoTBLEData.market_cap_rank})`}</p>
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
                    {(cryptoTBLEData.price_change_24h / 1440) * 100 <
                      cryptoTBLEData.market_cap_change_percentage_24h ||
                    cryptoTBLEData.price_change_24h * 100 <=
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
                        <p className="text-red-400">
                          {getFirstTwoDecimalNumbers(
                            cryptoTBLEData.price_change_percentage_24h,
                          )}
                          %
                        </p>
                      </>
                    )}
                  </td>
                  <td className="ST">
                    {(cryptoTBLEData.price_change_24h * 7) / 2 <=
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
    </>
  )
}
