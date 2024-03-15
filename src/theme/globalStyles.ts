import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  body {
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.White};
  }
`;
