import {MutableRefObject, useLayoutEffect, useRef} from 'react'

type RefValueArray = unknown[]
type RefArray = MutableRefObject<unknown>[]
type MaybeCallback = (() => unknown) | unknown

function refsChanged(currentsBefore: RefValueArray, refsAfter: RefArray): boolean {
  if (currentsBefore.length !== refsAfter.length) {
    return true
  }

  return currentsBefore.some((current, index) => refsAfter[index].current !== current)
}

function maybe(fn: MaybeCallback) {
  if (typeof fn === 'function') {
    fn()
  }
}

function noop(): void {
  //
}

export function useRefEffect(callbackFn: () => MaybeCallback, refs: RefArray): void {
  const currentsMemo = useRef<RefValueArray>([])
  const teardownMemo = useRef<MaybeCallback>(null)

  useLayoutEffect(() => {
    return () => {
      if (!refsChanged(currentsMemo.current, refs)) {
        maybe(teardownMemo.current)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useLayoutEffect(() => {
    if (refsChanged(currentsMemo.current, refs)) {
      teardownMemo.current = callbackFn() || noop
    }

    currentsMemo.current = refs.map(ref => ref.current)

    return () => {
      if (refsChanged(currentsMemo.current, refs)) {
        maybe(teardownMemo.current)
      }
    }
  })
}
