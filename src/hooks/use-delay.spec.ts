import {act, renderHook} from '@testing-library/react-hooks/dom'
import sinon, {SinonSpy, SinonStub} from 'sinon'

import {useDelay} from './use-delay'

interface UseDelayOptions {
  duration: Parameters<typeof useDelay>[1]
  shouldDelay: Parameters<typeof useDelay>[0]
}

describe('Hooks > .useDelay()', () => {
  let component: ReturnType<typeof renderHook<unknown, ReturnType<typeof useDelay>>>
  let options: UseDelayOptions
  let result: ReturnType<typeof useDelay>
  let timeoutFn: Parameters<typeof setTimeout>[0]

  let setTimeoutStub: SinonStub
  let clearTimeoutSpy: SinonSpy

  beforeEach(() => {
    setTimeoutStub = sinon
      .stub(window, 'setTimeout')
      .callsFake((fn: Parameters<typeof setTimeout>[0]) => {
        timeoutFn = fn
        return 123 as unknown as ReturnType<typeof setTimeout>
      })

    clearTimeoutSpy = sinon.spy(window, 'clearTimeout')

    options = {
      duration: 100,
      shouldDelay: true,
    }

    component = null
    render()
  })

  afterEach(() => {
    component.unmount()
    setTimeoutStub.restore()
    clearTimeoutSpy.restore()
  })

  function render() {
    if (component == null) {
      component = renderHook<unknown, ReturnType<typeof useDelay>>(() =>
        useDelay(options.shouldDelay, options.duration),
      )
    } else {
      component.rerender()
    }
    result = component.result.current
  }

  describe('when initially called', () => {
    it('returns true', () => {
      expect(result).to.equal(true)
    })

    it('sets a timeout', () => {
      expect(timeoutFn).not.to.equal(null)
    })
  })

  describe('when the delay duration has elapsed', () => {
    it('returns false', () => {
      act(() => timeoutFn())
      render()
      expect(result).to.equal(false)
    })
  })

  describe('when the .shouldDelay prop changes from `true` to `false`', () => {
    beforeEach(() => {
      options.shouldDelay = false
      render()
    })

    it('returns false', () => {
      expect(result).to.equal(false)
    })

    it('clears the timeout', () => {
      expect(clearTimeoutSpy.callCount).to.equal(1)
    })

    it('clears the timeout using the id of the timeout', () => {
      const [timeoutId] = clearTimeoutSpy.lastCall.args
      expect(timeoutId).to.equal(123)
    })
  })
})
