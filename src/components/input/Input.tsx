import styled from "styled-components";
import { Typography, typographyVariantStyles } from "..";
import { InputHTMLAttributes } from "react";
import { srOnlyStyles } from "../../theme";
import { ClassNameProps } from "../../helpers";

export type InputProps = {
  ariaLabel: string;
  hasError?: boolean;
  errorMessage?: string;
  fullWidth?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

type StyledInputProps = {
  $hasError?: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
  ${typographyVariantStyles.Text1}
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.Poppins};
  color: ${({ theme }) => theme.colors.black};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.red : theme.colors.grayMedium};

  background-color: ${({ theme }) => theme.colors.grayLight};

  padding: 12px 16px;
  &::placeholder {
    color: ${({ theme }) => theme.colors.grayDark};
  }

  &:focus {
    outline: none;
  }

  &:disabled {
    opacity: 0.5;
  }
`;

const ErrorMessage = styled(Typography)`
  visibility: ${({ children }) =>
    children ? "visible" : "hidden"}; // Hide the message but reserve space
  margin-left: 16px;
  height: 20px;
`;

const InputWrapper = styled.div<{ $fullWidth?: boolean }>`
  display: flex;
  flex-direction: column;
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

const HiddenLabel = styled.label`
  ${srOnlyStyles}
`;

export const Input = ({
  errorMessage,
  hasError,
  ariaLabel,
  fullWidth,
  className,
  ...inputProps
}: InputProps & ClassNameProps) => {
  return (
    <InputWrapper $fullWidth={fullWidth} className={className}>
      <HiddenLabel htmlFor={inputProps.name}>{ariaLabel}</HiddenLabel>
      <StyledInput $hasError={hasError} {...inputProps} />
      <ErrorMessage variant="Text1" color="red" fontSize={10}>
        {errorMessage}
      </ErrorMessage>
    </InputWrapper>
  );
};
