import { useMemo } from 'react'

import { useContextSelector } from 'use-context-selector'
import { TransactionsContext } from '../contexts/TransactionsContext'

export function useSummary() {
  const { transactionsData } = useContextSelector(
    TransactionsContext,
    (context) => context,
  )

  const summary = useMemo(() => {
    return transactionsData.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.price
          acc.total += transaction.price
        } else {
          acc.outcome += transaction.price
          acc.total -= transaction.price
        }

        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )
  }, [transactionsData])

  return summary
}
