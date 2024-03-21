import styled from 'styled-components'
import { Button, Typography } from '..'

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

type NavigationProps = {
  welcomeMessage: string
  logout: () => void
}

export function Navigation({ logout, welcomeMessage }: NavigationProps) {
  return (
    <Nav>
      <Wrapper>
        <Typography variant="Text1">{welcomeMessage}</Typography>
        <Button onClick={logout} type="button">
          LOGOUT
        </Button>
      </Wrapper>
    </Nav>
  )
}
