import styled from "styled-components";
import type { Colors } from "../../theme";
import { typographyVariantStyles } from ".";

export type TypographyProps = {
  variant: "Heading" | "Text1" | "Text2";
  fontSize?: number;
  color?: Colors;
};

export const Typography = styled.span<TypographyProps>`
  font-family: ${({ theme }) => theme.fonts.Poppins};
  ${({ variant }) => typographyVariantStyles[variant]}
  ${({ color, theme }) => `color: ${theme.colors[color || "black"]};`}
  ${({ fontSize }) => fontSize && `font-size: calc(1rem * ${fontSize} / 16);`}
`;
