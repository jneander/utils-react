import {useEffect, useRef, useState} from 'react'

export const USE_DELAY_DEFAULT_DURATION = 100

export function useDelay(
  shouldDelay: boolean,
  delayDuration = USE_DELAY_DEFAULT_DURATION,
): boolean {
  const [isDelayed, setIsDelayed] = useState(true)
  const timeoutRef = useRef(null)

  useEffect(() => {
    if (shouldDelay) {
      timeoutRef.current = setTimeout(() => {
        setIsDelayed(false)
      }, delayDuration)
    }

    return () => {
      clearTimeout(timeoutRef.current)
    }
  }, [delayDuration, shouldDelay])

  return shouldDelay && isDelayed
}
