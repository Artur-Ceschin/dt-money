import { useEffect, useState, useMemo } from 'react'
import { CaretLeft, CaretRight } from 'phosphor-react'
import { IconStyles, PageButtonStyles, PaginationContainer } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'

export function Pagination() {
  const [currentPage, setCurrentPage] = useState(1)
  const { fetchTransactions, allTransactions, itemsPerPage } =
    useContextSelector(TransactionsContext, (context) => context)

  const totalPages = Math.ceil(allTransactions.length / itemsPerPage)

  const visiblePageNumbers = useMemo(() => {
    const maxVisiblePages = 2
    const startPage = Math.max(1, currentPage - maxVisiblePages)
    const endPage = Math.min(totalPages, currentPage + maxVisiblePages)

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    )
  }, [currentPage, totalPages])

  async function handleSearchTransactions(page: number) {
    await fetchTransactions({ page })
  }

  useEffect(() => {
    handleSearchTransactions(currentPage)
  }, [currentPage])

  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  return (
    <PaginationContainer>
      <IconStyles
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={!canGoBack}
        active={canGoBack}
      >
        <CaretLeft size={24} />
      </IconStyles>

      <div>
        {visiblePageNumbers.map((page) => (
          <PageButtonStyles
            onClick={() => setCurrentPage(page)}
            key={page}
            active={page === currentPage}
          >
            {page}
          </PageButtonStyles>
        ))}
      </div>

      <IconStyles
        onClick={() => setCurrentPage(currentPage + 1)}
        active={canGoForward}
        disabled={!canGoForward}
      >
        <CaretRight size={24} />
      </IconStyles>
    </PaginationContainer>
  )
}
