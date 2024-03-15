import styled from "styled-components";
import { Typography, typographyVariantStyles } from "..";
import { ChangeEvent } from "react";
import { srOnlyStyles } from "../../theme";

export type InputProps = {
  ariaLabel: string;
  placeholder: string;
  type: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fullWidth?: boolean;
  hasError?: boolean;
  errorMessage?: string;
};

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
  placeholder,
  type,
  fullWidth,
  value,
  onChange,
  name,
}: InputProps) => {
  return (
    <InputWrapper $fullWidth={fullWidth}>
      <HiddenLabel htmlFor={name}>{ariaLabel}</HiddenLabel>
      <StyledInput
        $hasError={hasError}
        name={name}
        id={name}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
      />
      <ErrorMessage variant="Text1" color="red">
        {errorMessage}
      </ErrorMessage>
    </InputWrapper>
  );
};
