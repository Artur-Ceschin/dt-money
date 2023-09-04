import { styled } from 'styled-components'

export const PaginationContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
  margin: 3rem 0;
`

interface ActivationProps {
  active?: boolean
}

export const IconStyles = styled.div<ActivationProps>`
  svg {
    cursor: pointer;
    color: ${(props) => props.theme['gray-600']};
    width: 100px;
    height: 100%;
    width: 24px;

    ${(props) => props.active && `color: ${props.theme['green-500']};`}
  }
`

export const PageButtonStyles = styled.button<ActivationProps>`
  color: ${(props) => props.theme['gray-300']};

  border: 0;
  border-radius: 6px;
  margin: 0 8px;
  cursor: pointer;

  width: 40px;
  height: 40px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    filter: brightness(0.9);
  }

  ${(props) =>
    props.active
      ? `background-color: ${props.theme['green-700']};
    color: ${props.theme['gray-100']};`
      : `background-color: ${props.theme['gray-600']}`}
`
