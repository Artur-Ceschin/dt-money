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
  allTransactions: Transaction[]
  itemsPerPage: number

  fetchTransactions: (query?: string, page?: number) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionProviderProps {
  children: ReactNode
}
export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])

  const itemsPerPage = 4

  const fetchTransactions = useCallback(
    async (query?: string, page?: number) => {
      try {
        const response = await api.get('/transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            _page: page,
            _limit: itemsPerPage,
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

  const fetchAllTransactions = useCallback(async () => {
    try {
      const response = await api.get('/transactions', {
        params: {
          _sort: 'createdAt',
          _order: 'desc',
        },
      })

      setAllTransactions(response.data)
    } catch (error) {
      console.error(error)
    }
  }, [])

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
    fetchTransactions()
  }, [fetchTransactions])

  useEffect(() => {
    fetchAllTransactions()
  }, [fetchAllTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        fetchTransactions,
        createTransaction,
        allTransactions,
        itemsPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
