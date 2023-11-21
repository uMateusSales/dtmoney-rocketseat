import { useContext } from 'react'
import { TransactionContext } from '../contexts/TransactionContext'

export function useSummary() {
  const { transactions } = useContext(TransactionContext)

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'entrada') {
        acc.entrada += transaction.price
        acc.total += transaction.price
      } else {
        acc.saida += transaction.price
        acc.total -= transaction.price
      }
      return acc
    },

    {
      entrada: 0,
      saida: 0,
      total: 0,
    },
  )

  return summary
}
