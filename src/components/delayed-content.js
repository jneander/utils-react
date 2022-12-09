import {DEFAULT_DURATION, useDelay} from '../hooks/use-delay'

export function DelayedContent({children, duration, shouldDelay}) {
  const isDelayed = useDelay(shouldDelay, duration)
  return isDelayed ? null : children
}

DelayedContent.defaultProps = {
  duration: DEFAULT_DURATION,
  shouldDelay: true,
}
