import styled from 'styled-components'
import type { Colors } from '../../theme'
import { ReactNode } from 'react'
import { ClassNameProps } from '../../helpers'
import { baseTextStyles } from './variables'

type StyledTypographyProps = {
  $color?: Colors
}

const Heading = styled.h1<StyledTypographyProps>`
  font-size: calc(1rem * 18 / 16);
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0;
  color: ${({ theme, $color }) => theme.colors[$color || 'black']};
`

const Text1 = styled.p<StyledTypographyProps>`
  ${baseTextStyles}
  font-weight: 400;
  line-height: 1.14;
  color: ${({ theme, $color }) => theme.colors[$color || 'black']};
`

const Text2 = styled.span<StyledTypographyProps>`
  ${baseTextStyles}
  font-weight: 600;
  line-height: 1.43;
  color: ${({ theme, $color }) => theme.colors[$color || 'black']};
`

type TypographyProps = {
  /**
   * The variant of the typography. Heading is an `h1`, Text1 is a `p`, and Text2 is a `span`.
   */
  variant: 'Heading' | 'Text1' | 'Text2'
  /**
   * The content to display.
   */
  children: ReactNode
  /**
   * The color of the text.
   */
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
