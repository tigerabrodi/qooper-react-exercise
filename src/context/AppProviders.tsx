import { ThemeProvider } from "styled-components";
import { GlobalStyles, theme } from "../theme";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {children}
    </ThemeProvider>
  );
}
