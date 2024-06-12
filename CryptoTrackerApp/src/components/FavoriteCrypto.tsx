import { useCurrency } from '/Users/hbamb420/CryptoTracker/CryptoTrackerApp/lib/useCurrency.tsx'
import { US_currency } from './CryptoProvider'
import { useEffect } from 'react'

type CryptoStoringImagesAndContentProp = {
  currency: US_currency[]
}

export function FavoriteCrypto({
  currency,
}: CryptoStoringImagesAndContentProp) {
  const { setStoredFavorite, setItemFavoriteCrypto } = useCurrency()

  // get my local storage items
  useEffect(() => {
    setStoredFavorite()
  }, [])

  if (currency.length === 0) {
    return <h1>gay</h1>
  }

  return (
    <ul className="list-none flex flex-col md:grid md:grid-cols-3 lg:grid lg:grid-cols-3 sm:grid sm:grid-cols-2">
      {currency.map((cryptoCurr, index) => (
        <li key={index}>
          {/* <img src={cryptoCurr?.image} alt="x" /> */}
          <h2>{cryptoCurr.symbol}</h2>
        </li>
      ))}
    </ul>
  )
}
