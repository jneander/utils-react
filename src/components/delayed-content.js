import useDelay, {DEFAULT_DURATION} from '../hooks/use-delay'

export default function DelayedContent({children, duration, shouldDelay}) {
  const isDelayed = useDelay(shouldDelay, duration)
  return isDelayed ? null : children
}

DelayedContent.defaultProps = {
  duration: DEFAULT_DURATION,
  shouldDelay: true
}
