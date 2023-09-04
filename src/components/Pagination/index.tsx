import { CaretLeft, CaretRight } from 'phosphor-react'
import { IconButton, PaginationButton, PaginationContainer } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useEffect, useState } from 'react'
import { usePagination } from '../../hooks/usePagination'

export function Pagination() {
  const { fetchTransactions } = useContextSelector(
    TransactionsContext,
    (context) => context,
  )

  const [currentPage, setCurrentPage] = useState(1)

  const { nextPages, previousPages } = usePagination({ currentPage })

  useEffect(() => {
    fetchTransactions({ currentPage })
  }, [currentPage])

  return (
    <PaginationContainer>
      <IconButton
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={previousPages.length === 0}
      >
        <CaretLeft />
      </IconButton>

      {previousPages.length > 0 &&
        previousPages.map((page) => (
          <PaginationButton onClick={() => setCurrentPage(page)} key={page}>
            {page}
          </PaginationButton>
        ))}

      <PaginationButton
        variant="active"
        onClick={() => setCurrentPage(currentPage)}
      >
        {currentPage}
      </PaginationButton>

      {nextPages.length > 0 &&
        nextPages.map((page) => (
          <PaginationButton onClick={() => setCurrentPage(page)} key={page}>
            {page}
          </PaginationButton>
        ))}

      <IconButton
        disabled={nextPages.length === 0}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        <CaretRight />
      </IconButton>
    </PaginationContainer>
  )
}
