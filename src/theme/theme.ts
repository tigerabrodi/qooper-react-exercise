export type Colors =
  | "white"
  | "black"
  | "redPrimary"
  | "purplePrimary"
  | "bluePrimary"
  | "grayDark"
  | "grayMedium"
  | "grayLight";

const colors: Record<Colors, string> = {
  white: "#FFFFFF",
  black: "#171725",
  redPrimary: "#FF4545",
  purplePrimary: "#7000FF",
  bluePrimary: "#0062FF",
  grayDark: "#92929D", // GRAY-04
  grayMedium: "#F1F1F5", // GRAY-03
  grayLight: "#FAFAFB", // GRAY-02
};

export const theme = {
  fonts: {
    Poppins: "Poppins, sans-serif",
  },
  colors,
};

export type Theme = typeof theme;
