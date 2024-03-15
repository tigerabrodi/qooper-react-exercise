import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
  }

  html {
    height: 100%;
  }

  body {
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.White};
    height: 100%;
  }

  #root {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
  }
`;
