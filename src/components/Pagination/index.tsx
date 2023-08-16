import { CaretLeft, CaretRight } from 'phosphor-react'
import { PaginationButton, PaginationContainer } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useEffect, useState } from 'react'

const siblingsCount = 1

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

export function Pagination() {
  const { transactionsData, fetchTransactions, transactionsPerPage } =
    useContextSelector(TransactionsContext, (context) => context)

  const [currentPage, setCurrentPage] = useState(1)

  const lastPage = Math.ceil(transactionsData.length / transactionsPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []
  console.log('previousPages', previousPages)

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []
  console.log('nextPages', previousPages)

  useEffect(() => {
    fetchTransactions('', currentPage)
  }, [currentPage, fetchTransactions])

  return (
    <PaginationContainer>
      <CaretLeft
        onClick={() => setCurrentPage((state: number) => (state -= 1))}
      />

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

      <CaretRight
        onClick={() => setCurrentPage((state: number) => (state += 1))}
      />
    </PaginationContainer>
  )
}
