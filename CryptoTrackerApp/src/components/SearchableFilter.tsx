import { ChangeEvent, useState } from 'react'
import { CryptoMappedImagesType } from './CryptoApi'
import { CryptoApi } from './CryptoApi'

// type BtcFiltered = {
//   btcs: CryptoMappedImagesType[]
// }

// export function SearchableList({ btcs }: BtcFiltered) {
//   // current states
//   const [currSearch, setCurrSearch] = useState<string>('')

//   const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setCurrSearch(e.target.value)
//   }

//   let filteredBtcs = btcs
//   if (currSearch) {
//     filteredBtcs = btcs.filter((quote) =>
//       quote.id.toLowerCase().includes(currSearch.toLowerCase()),
//     )
//   }

//   return (
//     <>
//       <SearchableListInputCreation
//         inputSearch={handleSearchChange}
//         currSearch={currSearch}
//       />

//       <APIBtcSearching cryptos={filteredBtcs} />
//     </>
//   )
// }

// type InputSrch = {
//   inputSearch: (e: ChangeEvent<HTMLInputElement>) => void
//   currSearch: string
// }

// export function SearchableListInputCreation({
//   inputSearch,
//   currSearch,
// }: InputSrch) {
//   return (
//     <>
//       <input
//         onChange={inputSearch}
//         value={currSearch}
//         className="inputTop form-control text-white bg-black search"
//         type="text"
//         placeholder="Search..."
//       />
//     </>
//   )
// }

type PropsCryptosAPI = {
  cryptos: CryptoMappedImagesType[]
}

export function APIBtcSearching({ cryptos }: PropsCryptosAPI) {
  return (
    <ul>
      {cryptos.length === 0 && <h1 className="text-black">No Matches!!</h1>}
      {/* {cryptos.map((crypto, index) => (
        <h1>{crypto}</h1>
      ))} */}
    </ul>
  )
}
