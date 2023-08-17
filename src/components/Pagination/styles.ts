import { styled } from 'styled-components'

export const PaginationContainer = styled.footer`
  width: 100%;
  max-width: 400px;

  margin: 2rem auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`

interface ButtonProps {
  variant?: 'active' | 'default'
}

export const PaginationButton = styled.button<ButtonProps>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 6px;
  cursor: pointer;

  background-color: ${(props) =>
    props.variant === 'active'
      ? props.theme['green-500']
      : props.theme['gray-700']};
  color: ${(props) => props.theme['gray-300']};

  &:hover {
    background-color: ${(props) =>
      props.variant === 'active'
        ? props.theme['green-300']
        : props.theme['gray-600']};
    transition: 0.2s;
  }
`

export const IconButton = styled.button`
  background-color: transparent;
  border: none;
  color: white;

  cursor: pointer;
  padding: 4px;

  &:disabled {
    cursor: default;
    opacity: 0.5;
  }
`
