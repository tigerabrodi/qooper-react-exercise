import styled from "styled-components";
import type { Colors } from "../../theme";
import { typographyVariantStyles } from ".";
import { ReactNode } from "react";
import { ClassNameProps } from "../../helpers";

type StyledTypographyProps = {
  $variant: "Heading" | "Text1" | "Text2";
  $fontSize?: number;
  $color?: Colors;
};

export const StyledTypography = styled.span<StyledTypographyProps>`
  font-family: ${({ theme }) => theme.fonts.Poppins};
  ${({ $variant }) => typographyVariantStyles[$variant]}
  ${({ $color, theme }) => `color: ${theme.colors[$color || "black"]};`}
  ${({ $fontSize }) =>
    $fontSize && `font-size: calc(1rem * ${$fontSize} / 16);`}
`;

export type TypographyProps = {
  variant: "Heading" | "Text1" | "Text2";
  children: ReactNode;
  fontSize?: number;
  color?: Colors;
};

export function Typography({
  children,
  variant,
  fontSize,
  color,
  className,
}: TypographyProps & ClassNameProps) {
  return (
    <StyledTypography
      $variant={variant}
      $fontSize={fontSize}
      $color={color}
      className={className}
    >
      {children}
    </StyledTypography>
  );
}
