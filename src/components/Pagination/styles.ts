import styled from 'styled-components'

export const PaginationContainer = styled.div`
  width: 100%;

  margin: 3rem auto;
  display: flex;
  align-items: center;
  justify-content: center;

  gap: 1rem;
`

interface ButtonActiveStyles {
  active?: boolean
}

export const IconStyles = styled.button<ButtonActiveStyles>`
  background-color: transparent;
  border: none;
  cursor: pointer;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:disabled {
    cursor: not-allowed;
  }

  svg {
    width: 24px;
    height: 24px;
    color: ${(props) =>
      props.active ? props.theme['green-500'] : props.theme['gray-600']};
  }
`

export const PageButtonStyles = styled.button<ButtonActiveStyles>`
  background-color: transparent;
  border: none;
  cursor: pointer;

  margin: 0 8px;
  border-radius: 6px;

  background-color: ${(props) =>
    props.active ? props.theme['green-500'] : props.theme['gray-600']};
  color: ${(props) =>
    props.active ? props.theme['gray-100'] : props.theme['gray-300']};

  width: 40px;
  height: 40px;

  &:focus {
    outline: none;
    box-shadow: none;
  }

  &:hover {
    filter: brightness(0.9);
  }
`
