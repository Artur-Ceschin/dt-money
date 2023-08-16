import { useEffect, useMemo, useState } from 'react'
import { api } from '../lib/axios'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

export function useSummary() {
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])

  async function fetchAllTransactions() {
    const response = await api.get(`transactions`, {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactionsData(response.data)
  }

  useEffect(() => {
    fetchAllTransactions()
  }, [])

  const summary = useMemo(() => {
    return transactionsData.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactionsData])

  return summary
}
