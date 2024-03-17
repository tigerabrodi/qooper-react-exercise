import styled from 'styled-components'
import { baseTextStyles } from '..'
import { InputHTMLAttributes, forwardRef } from 'react'
import { srOnlyStyles } from '../../theme'
import { ClassNameProps } from '../../helpers'

export type InputProps = {
  /**
   * The accessible label for the input.
   */
  ariaLabel: string
  /**
   * Flag to indicate if the input has an error.
   */
  hasError?: boolean
  /**
   * The error message to display when `hasError` is true.
   */
  errorMessage?: string
  /**
   * If true, the input will take the full width of its container.
   */
  fullWidth?: boolean
} & InputHTMLAttributes<HTMLInputElement>

type StyledInputProps = {
  $hasError?: boolean
}

const StyledInput = styled.input<StyledInputProps>`
  ${baseTextStyles}
  width: 100%;
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.red : theme.colors.grayMedium};

  background-color: ${({ theme }) => theme.colors.grayLight};
  padding: 0 16px;
  height: 40px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.grayDark};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`

const ErrorMessage = styled.span`
  font-size: calc(1rem * 10 / 16);
  color: ${({ theme }) => theme.colors.red};
  position: absolute;
  bottom: -16px;
  left: 16px;
`

const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  position: relative;
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
`

const HiddenLabel = styled.label`
  ${srOnlyStyles}
`

export const Input = forwardRef<HTMLInputElement, InputProps & ClassNameProps>(
  (
    { errorMessage, hasError, ariaLabel, fullWidth, className, ...inputProps },
    ref
  ) => {
    return (
      <InputWrapper $fullWidth={fullWidth} className={className}>
        <HiddenLabel htmlFor={inputProps.name}>{ariaLabel}</HiddenLabel>
        <StyledInput $hasError={hasError} ref={ref} {...inputProps} />
        {hasError && <ErrorMessage>{errorMessage}</ErrorMessage>}
      </InputWrapper>
    )
  }
)
