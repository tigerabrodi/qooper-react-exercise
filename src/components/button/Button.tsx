import styled from 'styled-components'
import { Typography } from '..'
import { ClassNameProps } from '../../helpers'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  /**
   * If true, the button will take the full width of its container.
   */
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

type StyledButtonProps = {
  $fullWidth?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme }) => theme.colors.blue};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  color: white;
  padding: 12px 16px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.purple};
  }
`

export function Button({
  children,
  fullWidth,
  className,
  ...buttonProps
}: ButtonProps & ClassNameProps) {
  return (
    <StyledButton $fullWidth={fullWidth} className={className} {...buttonProps}>
      <Typography variant="Text2" color="white">
        {children}
      </Typography>
    </StyledButton>
  )
}
