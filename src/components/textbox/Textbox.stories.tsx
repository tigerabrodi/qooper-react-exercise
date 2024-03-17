import { useState } from 'react'
import { Meta, StoryObj } from '@storybook/react'
import { Textbox } from './Textbox'

const meta: Meta<typeof Textbox> = {
  title: 'Components/Textbox',
  component: Textbox,
  argTypes: {
    hasError: {
      control: 'boolean',
    },
    errorMessage: {
      control: 'text',
    },
  },
}

export default meta

type Story = StoryObj<typeof Textbox>

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Textbox
        {...args}
        ariaLabel="input"
        placeholder="Type here..."
        value={value}
        onChange={(event) => setValue(event.target.value)}
      />
    )
  },
}

export const WithError: Story = {
  render: (args) => {
    const [value, setValue] = useState('')
    return (
      <Textbox
        {...args}
        ariaLabel="input"
        placeholder="Type here..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    )
  },
  args: {
    hasError: true,
    errorMessage: 'Error message',
  },
}
