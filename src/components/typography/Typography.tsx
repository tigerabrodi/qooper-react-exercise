import styled, { css } from "styled-components";
import type { Colors } from "../../theme";
import { theme } from "../../theme";

export type TypographyProps = {
  variant: "Header" | "TextPrimary" | "TextSecondary";
  color?: Colors;
};

const variantStyles = {
  Header: css`
    font-size: calc(1rem * 18 / 16);
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0;
  `,
  TextPrimary: css`
    font-size: calc(1rem * 14 / 16);
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.1px;
  `,
  TextSecondary: css`
    font-size: calc(1rem * 14 / 16);
    font-weight: 600;
    line-height: 20px;
  `,
};

export const Typography = styled.span<TypographyProps>`
  font-family: "Poppins", sans-serif;
  ${({ variant }) => variantStyles[variant]}
  ${({ color }) => `color: ${theme.colors[color || "black"]};`}
`;
