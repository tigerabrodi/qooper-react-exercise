import styled from 'styled-components'
import { Typography } from '..'
import { Colors } from '../../theme'
import { ClassNameProps } from '../../helpers'
import { ButtonHTMLAttributes, ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode
  /**
   * The background color of the button, either blue or purple, defaults to blue.
   */
  bgColor?: Extract<Colors, 'blue' | 'purple'>
  /**
   * If true, the button will take the full width of its container.
   */
  fullWidth?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

type StyledButtonProps = {
  $bgColor?: Extract<Colors, 'blue' | 'purple'>
  $fullWidth?: boolean
}

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, $bgColor }) =>
    theme.colors[$bgColor || 'blue']};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  color: white;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
`

export function Button({
  children,
  bgColor,
  fullWidth,
  className,
  ...buttonProps
}: ButtonProps & ClassNameProps) {
  return (
    <StyledButton
      $bgColor={bgColor}
      $fullWidth={fullWidth}
      className={className}
      {...buttonProps}
    >
      <Typography variant="Text2" color="white">
        {children}
      </Typography>
    </StyledButton>
  )
}
