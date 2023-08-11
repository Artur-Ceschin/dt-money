import { styled } from 'styled-components'

export const PaginationContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 4rem auto 2rem;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;

  svg {
    cursor: pointer;
  }
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
