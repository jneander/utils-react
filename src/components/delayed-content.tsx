import type {ReactNode} from 'react'

import {USE_DELAY_DEFAULT_DURATION, useDelay} from '../hooks/use-delay'

export interface DelayedContentProps {
  children: ReactNode
  duration?: number
  shouldDelay?: boolean
}

export function DelayedContent(props: DelayedContentProps) {
  const {children, duration = USE_DELAY_DEFAULT_DURATION, shouldDelay = true} = props
  const isDelayed = useDelay(shouldDelay, duration)
  return isDelayed ? null : <>{children}</>
}
