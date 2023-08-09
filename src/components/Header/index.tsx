import { HeaderContainer, HeaderContent, TransactionButton } from "./styles";

import logoImage from '../../assets/logo.svg'

export function Header() {
  return(
    <HeaderContainer>

      <HeaderContent>
        <img src={logoImage} alt="" />

        <TransactionButton>Nova transação</TransactionButton>

      </HeaderContent>
    </HeaderContainer>
  )
}