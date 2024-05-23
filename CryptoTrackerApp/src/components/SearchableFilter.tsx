import { ChangeEvent, SetStateAction, useState } from 'react'
import { CryptoMappedImagesType } from './CryptoApi'

type PropsQuote = {
  quota: CryptoMappedImagesType[]
}


// type CryptoMappedImagesType = {
//    searchTerm: string;
//  };
 

export function SearchableFilterInput({ quota }: PropsQuote) {
   const [currSearch, setCurrSearch] = useState<CryptoMappedImagesType>({ searchTerm: '' });
   

   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCurrSearch({ searchTerm: e.target.value });
   };
   
   const filteredQuotes = quota.filter((quote) => {
      const searchTerm = currSearch.searchTerm.toLowerCase();
      const nameOfCrypto = quote.id.toLowerCase(); // Adjust `someField` to match your quote property
    });
   
   return (
      <>
      <SearchableListInputCreation
        inputSearch={(e: { target: { value: SetStateAction<string> } }) =>
          setCurrSearch(e.target.value)
         }
         currSearch={currSearch?.searchTerm || ''}
      />
           <SearchableQuotesArr
        quotes={quota.filter((quote) => {
          if (quota.toLowerCase().includes(currSearch?.toLowerCase())) {
            return true;
          } else {
            return false;
          }
        })}
      
    </>
  )
}

type InputSrch = {
  inputSearch: (index: ChangeEvent<HTMLInputElement>) => void
  currSearch: string
}

export function SearchableListInputCreation({
  inputSearch,
  currSearch,
}: InputSrch) {
  return (
    <>
      <input
        onChange={inputSearch}
        value={currSearch}
        className="inputTop form-control bg-dark search"
        type="text"
        placeholder="Search..."
      />
    </>
  )
}

type PropsArr = {
  quotes: CryptoMappedImagesType[]
}

export function SearchableQuotesArr({ quotes }: PropsArr) {
  return (
    <ul className="list-unstyled d-flex flex-column justify-content-start align-items-start">
      {quotes.map((q, index) => (
        <li className="text-left" key={index}>
          {q}
        </li>
      ))}
      {quotes.length === 0 && <p>No Matches!!</p>}
    </ul>
  )
}
