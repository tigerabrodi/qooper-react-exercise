import styled from "styled-components";
import { Typography } from "..";
import { Colors } from "../../theme";

type ButtonProps = {
  children: React.ReactNode;
  bgColor?: Extract<Colors, "blue" | "purple">;
};

const StyledButton = styled.button<Pick<ButtonProps, "bgColor">>`
  background-color: ${({ theme, bgColor }) => theme.colors[bgColor || "blue"]};
  color: white;
  padding: 12px 16px;
  width: 100%;
  max-width: 100%;
  border: none;
  cursor: pointer;
`;

export function Button({ children, bgColor }: ButtonProps) {
  return (
    <StyledButton bgColor={bgColor}>
      <Typography variant="Body2" color="white">
        {children}
      </Typography>
    </StyledButton>
  );
}
