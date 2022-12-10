import {useEffect} from 'react'

export const USE_DEBOUNCED_EFFECT_DEFAULT_DURATION = 300

export function useDebouncedEffect(
  callback: () => void,
  dependencies: unknown[],
  delay = USE_DEBOUNCED_EFFECT_DEFAULT_DURATION,
): void {
  return useEffect(() => {
    const timeoutId = window.setTimeout(callback, delay)

    return () => {
      window.clearTimeout(timeoutId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dependencies])
}
