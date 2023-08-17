import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

const siblingsCount = 2

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0)
}

interface usePaginationProps {
  currentPage: number
}

export function usePagination({ currentPage }: usePaginationProps) {
  const { transactionsData, transactionsPerPage } = useContextSelector(
    TransactionsContext,
    (context) => context,
  )

  const lastPage = Math.ceil(transactionsData.length / transactionsPerPage)

  const previousPages =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : []

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage),
        )
      : []

  return { previousPages, nextPages }
}
