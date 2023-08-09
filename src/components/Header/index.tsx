import * as Dialog from '@radix-ui/react-dialog'

import { HeaderContainer, HeaderContent, TransactionButton } from './styles'
import logoImage from '../../assets/logo.svg'
import { NewTransactionModal } from '../NewTransactionModal'

export function Header() {
  return (
    <HeaderContainer>
      <HeaderContent>
        <img src={logoImage} alt="" />

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <TransactionButton>Nova transação</TransactionButton>
          </Dialog.Trigger>

          <NewTransactionModal />
        </Dialog.Root>
      </HeaderContent>
    </HeaderContainer>
  )
}
