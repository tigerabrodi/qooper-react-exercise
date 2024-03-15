import { ThemeProvider } from "styled-components";
import { withThemeFromJSXProvider } from "@storybook/addon-themes";
import { theme, GlobalStyles } from "../src/theme";

export const decorators = [
  withThemeFromJSXProvider({
    themes: {
      light: theme,
    },
    defaultTheme: "light",
    Provider: ThemeProvider,
    GlobalStyles,
  }),
];
