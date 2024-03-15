import styled, { css } from "styled-components";
import type { Colors } from "../../theme";

export type TypographyProps = {
  variant: "Heading" | "Text1" | "Text2";
  color?: Colors;
};

const variantStyles = {
  Heading: css`
    font-size: calc(1rem * 18 / 16);
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0;
  `,
  Text1: css`
    font-size: calc(1rem * 14 / 16);
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0.1px;
  `,
  Text2: css`
    font-size: calc(1rem * 14 / 16);
    font-weight: 600;
    line-height: 20px;
    letter-spacing: 0.1px;
  `,
};

export const Typography = styled.span<TypographyProps>`
  font-family: "Poppins", sans-serif;
  ${({ variant }) => variantStyles[variant]}
  ${({ color, theme }) => `color: ${theme.colors[color || "black"]};`}
`;
