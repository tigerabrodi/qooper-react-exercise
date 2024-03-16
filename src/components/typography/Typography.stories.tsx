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

export const Heading: Story = {
  args: {
    variant: "Heading",
    color: "black",
  },
  render: (args) => <Typography {...args}>Heading</Typography>,
};

export const Text1: Story = {
  args: {
    variant: "Text1",
    color: "black",
  },
  render: (args) => <Typography {...args}>Text1</Typography>,
};

export const Text2: Story = {
  args: {
    variant: "Text2",
    color: "black",
  },
  render: (args) => <Typography {...args}>Text2</Typography>,
};
