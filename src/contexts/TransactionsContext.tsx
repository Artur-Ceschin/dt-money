import { ReactNode, useCallback, useEffect, useState } from 'react'
import { api } from '../lib/axios'
import { createContext } from 'use-context-selector'

interface Transaction {
  id: number
  description: string
  type: 'income' | 'outcome'
  price: number
  category: string
  createdAt: string
}

interface CreateTransactionInput {
  description: string
  price: number
  category: string
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transactions: Transaction[]
  transactionsData: Transaction[]
  transactionsPerPage: number
  fetchTransactions: (query?: string, page?: number) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
  setTransactions: (data: Transaction[]) => void
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionProviderProps {
  children: ReactNode
}
export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([])

  const transactionsPerPage = 4

  const fetchTransactions = useCallback(
    async (query?: string, page?: number) => {
      try {
        const response = await api.get('/transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            _page: page,
            _limit: transactionsPerPage,
            q: query,
          },
        })

        setTransactions(response.data)
      } catch (error) {
        console.error(error)
      }
    },
    [],
  )

  async function fetchAllTransactions() {
    const response = await api.get(`transactions`, {
      params: {
        _sort: 'createdAt',
        _order: 'desc',
      },
    })

    setTransactionsData(response.data)
  }

  const createTransaction = useCallback(
    async ({ category, description, price, type }: CreateTransactionInput) => {
      const response = await api.post('transactions', {
        category,
        description,
        price,
        type,
        createdAt: new Date(),
      })

      setTransactions((state) => [response.data, ...state])
    },
    [],
  )

  useEffect(() => {
    fetchAllTransactions()
  }, [])

  useEffect(() => {
    fetchTransactions()
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        transactionsData,
        setTransactions,
        transactionsPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
