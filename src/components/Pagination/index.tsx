import { CaretLeft, CaretRight } from 'phosphor-react'
import { IconStyles, PageButtonStyles, PaginationContainer } from './styles'
import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../../contexts/TransactionsContext'
import { useEffect, useMemo, useState } from 'react'

export function Pagination() {
  const { allTransactions, fetchTransactions, limitPerPage } =
    useContextSelector(TransactionsContext, (context) => context)

  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(allTransactions.length / limitPerPage)

  const visiblePages = useMemo(() => {
    const maxVisiblePages = 2

    const startPage = Math.max(1, currentPage - maxVisiblePages)
    const endPage = Math.min(totalPages, currentPage + maxVisiblePages)

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index,
    )
  }, [currentPage, totalPages])

  async function handleTransactionPages() {
    await fetchTransactions({ page: currentPage })
  }

  useEffect(() => {
    handleTransactionPages()
  }, [currentPage])

  const canGoBack = currentPage > 1
  const canGoForward = currentPage < totalPages

  return (
    <PaginationContainer>
      <IconStyles
        onClick={() => setCurrentPage(currentPage - 1)}
        active={canGoBack}
        disabled={!canGoBack}
      >
        <CaretLeft />
      </IconStyles>

      <div>
        {visiblePages.map((page) => (
          <PageButtonStyles
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
            key={page}
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
        <CaretRight />
      </IconStyles>
    </PaginationContainer>
  )
}
