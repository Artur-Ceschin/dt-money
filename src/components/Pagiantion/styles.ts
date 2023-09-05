import { styled } from 'styled-components'

export const PaginationContainer = styled.footer`
  width: 100%;

  margin: 3rem auto;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: 16px;
`

interface ActivationProps {
  active?: boolean
}

export const IconStyles = styled.button<ActivationProps>`
  background-color: transparent;
  border: none;
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
