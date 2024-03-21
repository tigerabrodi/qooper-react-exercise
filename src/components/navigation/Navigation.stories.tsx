import type { Meta, StoryObj } from '@storybook/react'
import { Navigation } from '.'

const meta: Meta<typeof Navigation> = {
  component: Navigation,
}

export default meta
type Story = StoryObj<typeof Navigation>

export const LoggedIn: Story = {
  args: {
    welcomeMessage: 'Welcome, John Doe',
    logout: () => console.log('Logout function triggered'),
  },
}
