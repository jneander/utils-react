import {useCallback, useMemo, useRef, useState} from 'react'

export function useTwoWayState<T = unknown>(externalValue: T): ReturnType<typeof useState<T>> {
  const canonicalRef = useRef(externalValue)
  const [, setInternalValue] = useState(externalValue)

  useMemo(() => {
    canonicalRef.current = externalValue
  }, [externalValue])

  const setValue = useCallback((value: T) => {
    canonicalRef.current = value
    setInternalValue(value)
  }, [])

  return [canonicalRef.current, setValue]
}
