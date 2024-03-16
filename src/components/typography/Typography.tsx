import styled from 'styled-components'
import type { Colors } from '../../theme'
import { baseTextStyles } from './variables'
import { ReactNode } from 'react'
import { ClassNameProps } from '../../helpers'

type StyledTypographyProps = {
  $color?: Colors
}

const Heading = styled.h1<StyledTypographyProps>`
  font-size: calc(1rem * 18 / 16);
  font-weight: 600;
  line-height: 28px;
  letter-spacing: 0;
  color: ${({ theme, $color }) => theme.colors[$color || 'black']};
`

const Text1 = styled.p<StyledTypographyProps>`
  ${baseTextStyles}
  font-weight: 400;
  color: ${({ theme, $color }) => theme.colors[$color || 'black']};
`

const Text2 = styled.span<StyledTypographyProps>`
  ${baseTextStyles}
  font-weight: 600;
  color: ${({ theme, $color }) => theme.colors[$color || 'black']};
`

type TypographyProps = {
  variant: 'Heading' | 'Text1' | 'Text2'
  children: ReactNode
  color?: Colors
}

const componentMap = {
  Heading,
  Text1,
  Text2,
}

export function Typography({
  children,
  variant,
  color,
  className,
}: TypographyProps & ClassNameProps) {
  const Component = componentMap[variant]

  return (
    <Component $color={color} className={className}>
      {children}
    </Component>
  )
}
