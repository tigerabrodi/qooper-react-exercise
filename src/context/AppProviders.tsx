import { ThemeProvider } from "styled-components";
import { BrowserRouter as Router } from "react-router-dom";
import { GlobalStyles, theme } from "../theme";
import { UserProvider } from ".";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <UserProvider>{children}</UserProvider>
      </Router>
    </ThemeProvider>
  );
}
