import type {MutableRefObject, RefCallback} from 'react'

export type CombinableRef<T = unknown> = RefCallback<T> | MutableRefObject<T> | null

export function combineRefs<T = unknown>(...refs: CombinableRef<T>[]): RefCallback<T> {
  return _ref => {
    refs.forEach(ref => {
      if (typeof ref === 'function') {
        ref(_ref)
      } else if (ref != null) {
        ref.current = _ref
      }
    })
  }
}
