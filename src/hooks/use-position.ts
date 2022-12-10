import {createPopper} from '@popperjs/core'
import type {MutableRefObject} from 'react'

import {useRefEffect} from './use-ref-effect'

export interface UsePositionOptions {
  anchorRef: MutableRefObject<HTMLElement>
  contentRef: MutableRefObject<HTMLElement>
  popperOptions: Parameters<typeof createPopper>[2]
}

export function usePosition(options: UsePositionOptions): void {
  const {anchorRef, contentRef, popperOptions} = options

  return useRefEffect(() => {
    if (!anchorRef.current || !contentRef.current) {
      return
    }

    const popper = createPopper(anchorRef.current, contentRef.current, popperOptions)

    return () => {
      popper.destroy()
    }
  }, [anchorRef, contentRef])
}
