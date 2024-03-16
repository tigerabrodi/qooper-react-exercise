import styled from 'styled-components'
import { Button, Typography } from '..'
import { useUser } from '../../hooks'

const Nav = styled.nav`
  width: 100%;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.grayLight};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grayMedium};
`

const Wrapper = styled.div`
  display: flex;
  column-gap: 32px;
  align-items: center;
  justify-content: end;
`

export function Navigation() {
  const { currentUser, logout } = useUser()

  return (
    <Nav>
      <Wrapper>
        <Typography variant="Text1">
          Welcome, {currentUser?.firstName}
        </Typography>
        <Button onClick={logout} type="button">
          LOGOUT
        </Button>
      </Wrapper>
    </Nav>
  )
}
