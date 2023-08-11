import { CaretLeft, CaretRight } from 'phosphor-react'
import { PaginationButton, PaginationContainer } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useCallback, useEffect, useState } from 'react'
import { api } from '../../lib/axios'

const range = (start: number, end: number) => {
  return [...Array(end).keys()].map((el) => el + start)
}

export function Pagination() {
  const { setTransactions, transactionsData } = useContextSelector(
    TransactionsContext,
    (context) => {
      return {
        transactionsData: context.transactionsData,
        setTransactions: context.setTransactions,
      }
    },
  )

  const [currentPage, setCurrentPage] = useState(1)

  const [transactionsPage, setTransactionsPage] = useState([])

  const transactionsPageLimit = 3

  const pages = Math.ceil(transactionsData.length / transactionsPageLimit)
  const value = range(1, pages)
  console.log('value', value)

  const fetchTransactionsFromPage = useCallback(async () => {
    const response = await api.get(`transactions`, {
      params: {
        _page: currentPage,
        _limit: transactionsPageLimit,
      },
    })

    setTransactionsPage(response.data)
    setTransactions(response.data)
  }, [currentPage, setTransactions])

  useEffect(() => {
    fetchTransactionsFromPage()
  }, [fetchTransactionsFromPage])

  console.log('transactionsPage', transactionsPage)

  return (
    <PaginationContainer>
      <CaretLeft
        onClick={() => setCurrentPage((state: number) => (state -= 1))}
      />

      {value.map((item: number) => {
        return (
          <PaginationButton
            key={item}
            onClick={() => setCurrentPage(item)}
            variant={item === currentPage ? 'active' : 'default'}
          >
            {item}
          </PaginationButton>
        )
      })}

      <CaretRight
        onClick={() => setCurrentPage((state: number) => (state += 1))}
      />
    </PaginationContainer>
  )
}
