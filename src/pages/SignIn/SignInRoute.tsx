import { ChangeEvent, FormEvent, useState } from 'react'
import { Typography, Input, Button } from '../../components'
import styled from 'styled-components'
import { useUser } from '../../hooks'
import { Status } from '../../helpers'

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 24px;
  margin: auto 0;
  width: 312px;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  row-gap: 24px;
`

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const LoadingWrapper = styled.div`
  margin: auto;
`

export function SignInRoute() {
  const [formData, setFormData] = useState({
    username: '',
    firstName: '',
    lastName: '',
  })

  const [formErrors, setFormErrors] = useState({
    username: false,
    firstName: false,
  })

  const [status, setStatus] = useState<Status>('idle')

  const { login } = useUser()

  async function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    const isAnyRequiredField = ['username', 'firstName'].includes(name)
    if (isAnyRequiredField) {
      setFormErrors((prev) => ({ ...prev, [name]: value.trim() === '' }))
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setStatus('loading')

    const newErrors = {
      username: formData.username.trim() === '',
      firstName: formData.firstName.trim() === '',
    }

    setFormErrors(newErrors)

    const hasErrors = Object.values(newErrors).some((isError) => isError)

    if (hasErrors) {
      setStatus('error')
    } else {
      await login(formData)
      setStatus('success')
    }
  }

  return (
    <Main>
      {status === 'loading' ? (
        <LoadingWrapper role="alert" aria-label="loading">
          <Typography variant="Heading">Loading...</Typography>
        </LoadingWrapper>
      ) : (
        <>
          <Typography variant="Heading">Login to your account</Typography>

          <Form onSubmit={handleSubmit}>
            <InputWrapper>
              <Input
                name="username"
                type="text"
                placeholder="Username"
                ariaLabel="username"
                fullWidth
                value={formData.username}
                onChange={handleChange}
                hasError={formErrors.username}
                errorMessage={formErrors.username ? 'Username is required' : ''}
              />
              <Input
                name="firstName"
                type="text"
                placeholder="First Name"
                ariaLabel="first name"
                fullWidth
                value={formData.firstName}
                onChange={handleChange}
                hasError={formErrors.firstName}
                errorMessage={
                  formErrors.firstName ? 'First name is required' : ''
                }
              />
              <Input
                name="lastName"
                type="text"
                placeholder="Last Name"
                ariaLabel="last name"
                fullWidth
                value={formData.lastName}
                onChange={handleChange}
              />
            </InputWrapper>
            <Button fullWidth bgColor="blue" type="submit">
              LOGIN
            </Button>
          </Form>
        </>
      )}
    </Main>
  )
}
