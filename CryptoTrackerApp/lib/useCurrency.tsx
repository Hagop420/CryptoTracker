import { useContext } from 'react'
import { cryptoContext } from '../src/components/CryptoProvider'

export function useCurrency() {
  const context = useContext(cryptoContext)
  if (!context) {
    throw new Error('useCurrency must be used inside of CryptoProvider')
  }
  return context
}
