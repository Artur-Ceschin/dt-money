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

interface FetchTransactionsProps {
  query?: string
  currentPage?: number
}

interface TransactionContextType {
  transactions: Transaction[]
  transactionsData: Transaction[]

  transactionsPerPage: number

  fetchTransactions: ({
    currentPage,
    query,
  }: FetchTransactionsProps) => Promise<void>
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
    async ({ currentPage = 1, query = '' }: FetchTransactionsProps) => {
      try {
        const response = await api.get('/transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            _page: currentPage,
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
  }, [transactionsData])

  useEffect(() => {
    fetchTransactions({})
  }, [fetchTransactions])

  return (
    <TransactionsContext.Provider
      value={{
        transactions,
        transactionsData,
        fetchTransactions,
        createTransaction,

        setTransactions,
        transactionsPerPage,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  )
}
