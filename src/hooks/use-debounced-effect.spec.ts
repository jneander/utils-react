import {act, renderHook} from '@testing-library/react-hooks/dom'
import sinon, {SinonSpy, SinonStub} from 'sinon'

import {USE_DEBOUNCED_EFFECT_DEFAULT_DURATION, useDebouncedEffect} from './use-debounced-effect'

type UseDebouncedEffectParameters = Parameters<typeof useDebouncedEffect>

interface UseDebouncedEffectOptions {
  callback: SinonSpy
  dependencies: UseDebouncedEffectParameters[1]
  duration: UseDebouncedEffectParameters[2]
}

describe('Hooks > .useDebouncedEffect()', () => {
  let component: ReturnType<typeof renderHook>
  let options: UseDebouncedEffectOptions
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
      callback: sinon.spy(),
      dependencies: ['example'],
      duration: 100,
    }

    component = null
  })

  afterEach(() => {
    setTimeoutStub.restore()
    clearTimeoutSpy.restore()
  })

  function render() {
    if (component == null) {
      component = renderHook(() =>
        useDebouncedEffect(options.callback, options.dependencies, options.duration),
      )
    } else {
      component.rerender()
    }
  }

  describe('when initially called', () => {
    it('does not call the callback', () => {
      render()
      expect(options.callback.callCount).to.equal(0)
    })

    it('sets a timeout', () => {
      render()
      expect(timeoutFn).not.to.equal(null)
    })

    it('sets the timeout using the given duration', () => {
      render()
      const [, duration] = setTimeoutStub.lastCall.args
      expect(duration).to.equal(100)
    })

    it('sets the timeout using a default duration when given no duration', () => {
      delete options.duration
      render()
      const [, duration] = setTimeoutStub.lastCall.args
      expect(duration).to.equal(USE_DEBOUNCED_EFFECT_DEFAULT_DURATION)
    })
  })

  describe('when the delay duration has elapsed', () => {
    it('calls the callback function', () => {
      render()
      act(() => timeoutFn())
      expect(options.callback.callCount).to.equal(1)
    })
  })

  describe('when the dependencies change before the delay duration has elapsed', () => {
    beforeEach(() => {
      render()
      options.dependencies = ['changed']
      render()
    })

    it('clears the current timeout', () => {
      expect(clearTimeoutSpy.callCount).to.equal(1)
    })

    it('clears the current timeout using the id of the timeout', () => {
      const [timeoutId] = clearTimeoutSpy.lastCall.args
      expect(timeoutId).to.equal(123)
    })

    it('sets another timeout', () => {
      expect(timeoutFn).not.to.equal(null)
    })

    it('sets the timeout using the given duration', () => {
      const [, duration] = setTimeoutStub.lastCall.args
      expect(duration).to.equal(100)
    })
  })

  describe('when the consuming component is unmounted', () => {
    beforeEach(() => {
      render()
      component.unmount()
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
