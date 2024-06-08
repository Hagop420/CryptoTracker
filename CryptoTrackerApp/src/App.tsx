import { useEffect, useState } from 'react'
import './App.css'
import { CryptoApi } from './components/CryptoApi'
import { FavoriteCrypto } from './components/FavoriteCrypto'
import { CryptoProvider , type US_currency, cryptocurrencyUsContext } from './components/CryptoProvider'
import { Route , Routes} from 'react-router-dom'

function App() {
  const [cryptoItems, setCryptoItems] = useState<US_currency[]>([])

   // state for Item object - only 1
 const [imageContentStored, setImageContentStored] = useState<US_currency>()
  

  // Creating the LS function

  function setItemFavoriteCryptos(item: US_currency) {
    let favCrypto = [...cryptoItems, item]
    setCryptoItems(favCrypto)
    
    localStorage.setItem('Crypto_Information', JSON.stringify(favCrypto))
  }
  useEffect(() => {
    if (!localStorage.getItem('Crypto_Information')) {
        localStorage.setItem('Crypto_Information' , JSON.stringify(cryptoItems))
      
    }
  }, [cryptoItems])
  


   // getting my LS planets info parsed
   function storedContents() {
    const getStoredCRYPTO = localStorage.getItem('Crypto_Information')
    if(getStoredCRYPTO === null) return;
    setCryptoItems(JSON.parse(getStoredCRYPTO))
   }
  
   useEffect(() => {
    const getStoredCRYPTO = localStorage.getItem('Crypto_Information')
    if(getStoredCRYPTO === null) return;
    setCryptoItems(JSON.parse(getStoredCRYPTO))
   }, [])
  
  // context function
  const contextValueCryptoCurrency: cryptocurrencyUsContext = {
    currencyItem: cryptoItems,
    setItemFavoriteCrypto: setItemFavoriteCryptos,
    setStoredFavorite: storedContents,

  }


  return (
    <>
      <CryptoProvider value={contextValueCryptoCurrency}>
        <Routes>
        <Route index element={<CryptoApi />} />
        <Route path='/favorite_currencies' element={<FavoriteCrypto currency={cryptoItems} />} />
        </Routes>
      </CryptoProvider>
    </>
  )
}

export default App
