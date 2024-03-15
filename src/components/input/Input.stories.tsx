import { useState } from "react";
import { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/Input",
  component: Input,
  argTypes: {
    hasError: {
      control: "boolean",
    },
    errorMessage: {
      control: "text",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Input>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        ariaLabel="input"
        placeholder="Type here..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    );
  },
};

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState("");
    return (
      <Input
        {...args}
        ariaLabel="input"
        placeholder="Type here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    );
  },
  args: {
    hasError: true,
    errorMessage: "Error message",
  },
};
