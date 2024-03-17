import type { Meta, StoryObj } from '@storybook/react'
import { Navigation } from '.'

const meta: Meta<typeof Navigation> = {
  component: Navigation,
}

export default meta
type Story = StoryObj<typeof Navigation>

export const LoggedIn: Story = {
  args: {
    currentUser: { id: '1', firstName: 'John' },
    logout: () => console.log('Logout function triggered'),
  },
}
