import { css } from "styled-components";

const baseTextStyles = css`
  font-size: calc(1rem * 14 / 16);
  line-height: 20px;
  letter-spacing: 0.1px;
`;

/* Exporting styles from this file because fast refresh only works when a file only exports components. eslint(react-refresh/only-export-components) */
export const typographyVariantStyles = {
  Heading: css`
    font-size: calc(1rem * 18 / 16);
    font-weight: 600;
    line-height: 28px;
    letter-spacing: 0;
  `,
  Text1: css`
    ${baseTextStyles}
    font-weight: 400;
  `,
  Text2: css`
    ${baseTextStyles}
    font-weight: 600;
  `,
};
