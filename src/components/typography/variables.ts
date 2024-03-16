import { css } from "styled-components";

/* Exporting variables from this file because fast refresh only works when a file only exports components. eslint(react-refresh/only-export-components) */
export const baseTextStyles = css`
  font-size: calc(1rem * 14 / 16);
  line-height: 20px;
  letter-spacing: 0.1px;
`;
