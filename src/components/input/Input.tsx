import styled from "styled-components";
import { Typography, typographyVariantStyles } from "..";
import { ChangeEvent } from "react";

export type InputProps = {
  ariaLabel: string;
  placeholder: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  hasError?: boolean;
  errorMessage?: string;
};

type StyledInputProps = {
  $hasError?: boolean;
};

const StyledInput = styled.input<StyledInputProps>`
  ${typographyVariantStyles.Text1}
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
`;

const ErrorMessage = styled(Typography)`
  margin-left: 16px;
  margin-top: 2px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Input = ({
  errorMessage,
  hasError,
  ariaLabel,
  onChange,
  placeholder,
  value,
}: InputProps) => {
  return (
    <InputWrapper>
      <StyledInput
        $hasError={hasError}
        aria-label={ariaLabel}
        onChange={onChange}
        placeholder={placeholder}
        value={value}
      />
      {hasError && (
        <ErrorMessage variant="Text1" color="red">
          {errorMessage}
        </ErrorMessage>
      )}
    </InputWrapper>
  );
};
