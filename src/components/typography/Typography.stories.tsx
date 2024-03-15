import type { Meta, StoryObj } from "@storybook/react";
import { Typography } from "./Typography";
import { theme } from "../../theme";

const meta: Meta<typeof Typography> = {
  component: Typography,
  argTypes: {
    color: {
      control: "select",
      options: Object.keys(theme.colors),
    },
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Header: Story = {
  args: {
    variant: "Heading",
    color: "black",
  },
  render: (args) => <Typography {...args}>Header</Typography>,
};

export const TextPrimary: Story = {
  args: {
    variant: "Body1",
    color: "black",
  },
  render: (args) => <Typography {...args}>TextPrimary</Typography>,
};

export const TextSecondary: Story = {
  args: {
    variant: "Body2",
    color: "black",
  },
  render: (args) => <Typography {...args}>TextSecondary</Typography>,
};
