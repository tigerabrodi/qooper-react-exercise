import styled from "styled-components";
import { Typography } from "..";
import { Colors } from "../../theme";

type ButtonProps = {
  children: React.ReactNode;
  bgColor?: Extract<Colors, "blue" | "purple">;
  fullWidth?: boolean;
};

type StyledButtonProps = Omit<ButtonProps, "children">;

const StyledButton = styled.button<StyledButtonProps>`
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor || "blue"]};
  width: ${({ fullWidth }) => (fullWidth ? "100%" : "auto")};
  color: white;
  padding: 12px 16px;
  border: none;
  cursor: pointer;
`;

export function Button({ children, bgColor, fullWidth }: ButtonProps) {
  return (
    <StyledButton bgColor={bgColor} fullWidth={fullWidth}>
      <Typography variant="Text2" color="white">
        {children}
      </Typography>
    </StyledButton>
  );
}
