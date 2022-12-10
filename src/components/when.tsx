import type {ReactNode} from 'react'

export interface WhenProps {
  case: unknown
  children: ReactNode
}

export function When(props: WhenProps) {
  if (props.case) {
    return props.children
  }

  return null
}
