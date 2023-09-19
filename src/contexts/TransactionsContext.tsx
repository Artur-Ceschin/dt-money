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

interface FetchAllTransactionsProps {
  query?: string
  page?: number
}

interface TransactionContextType {
  transactions: Transaction[]
  allTransactions: Transaction[]
  limitPerPage: number

  fetchTransactions: ({
    page,
    query,
  }: FetchAllTransactionsProps) => Promise<void>
  createTransaction: (data: CreateTransactionInput) => Promise<void>
}

export const TransactionsContext = createContext({} as TransactionContextType)

interface TransactionProviderProps {
  children: ReactNode
}

const limitPerPage = 4
export function TransactionsProvider({ children }: TransactionProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  const [allTransactions, setAllTransactions] = useState<Transaction[]>([])

  const fetchTransactions = useCallback(
    async ({ page = 1, query = '' }: FetchAllTransactionsProps) => {
      try {
        const response = await api.get('/transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query,
            _page: page,
            _limit: limitPerPage,
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
    fetchTransactions({})
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
        limitPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
