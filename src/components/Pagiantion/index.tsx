import { CaretLeft, CaretRight } from 'phosphor-react'
import { IconStyles, PageButtonStyles, PaginationContainer } from './styles'

export function Pagination() {
  return (
    <PaginationContainer>
      <IconStyles active>
        <CaretLeft size={24} />
      </IconStyles>

      <div className="pages">
        <PageButtonStyles active>1</PageButtonStyles>
        <PageButtonStyles>2</PageButtonStyles>
        <PageButtonStyles>3</PageButtonStyles>
      </div>

      <IconStyles active={false}>
        <CaretRight size={24} />
      </IconStyles>
    </PaginationContainer>
  )
}
