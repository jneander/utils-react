import {renderHook} from '@testing-library/react-hooks/dom'
import {MutableRefObject, createRef} from 'react'
import sinon, {SinonStub} from 'sinon'

import {useRefEffect} from './use-ref-effect'

describe('Hooks > .useRefEffect()', () => {
  let component: ReturnType<typeof renderHook>
  let callbackFn: SinonStub
  let callbackTeardownFn: SinonStub
  let refs: MutableRefObject<string>[]
  let previousOnError: typeof window.onerror

  beforeEach(() => {
    previousOnError = window.onerror
    window.onerror = null

    component = null

    refs = [createRefWith('initialA'), createRefWith('initialB')]
    callbackFn = sinon.stub().callsFake(() => callbackTeardownFn)
    callbackTeardownFn = sinon.stub()
  })

  afterEach(() => {
    component.unmount()
    window.onerror = previousOnError
  })

  function createRefWith(value: string): MutableRefObject<string> {
    const ref = createRef<string>() as MutableRefObject<string>
    ref.current = value
    return ref
  }

  function render() {
    if (component == null) {
      component = renderHook(() => useRefEffect(callbackFn, refs))
    } else {
      component.rerender()
    }
  }

  it('calls the callback function when initially called', () => {
    render()
    expect(callbackFn.callCount).to.equal(1)
  })

  context('when removing the effect', () => {
    it('calls the result of the callback function', () => {
      render()
      component.unmount()
      expect(callbackTeardownFn.callCount).to.equal(1)
    })

    it('ignores a non-function result of the callback function', () => {
      callbackTeardownFn = 'not-a-function' as unknown as SinonStub
      render()
      expect(component.unmount).not.to.throw()
    })
  })

  describe('when called again with the same refs', () => {
    it('does not call the callback function', () => {
      render()
      const initialCallCount = callbackFn.callCount
      render()
      expect(callbackFn.callCount).to.equal(initialCallCount)
    })

    it('does not call the result of the callback function', () => {
      render()
      render()
      expect(callbackTeardownFn.callCount).to.equal(0)
    })

    context('when removing the effect after a no-change call', () => {
      it('calls the result of the callback function', () => {
        render()
        render()
        component.unmount()
        expect(callbackTeardownFn.callCount).to.equal(1)
      })

      it('ignores a non-function result of the callback function', () => {
        callbackTeardownFn = 'not-a-function' as unknown as SinonStub
        render()
        render()
        expect(component.unmount).not.to.throw()
      })
    })
  })

  describe('when called again with different refs', () => {
    it('calls the callback function', () => {
      render()
      const initialCallCount = callbackFn.callCount
      refs[0].current = 'updatedA'
      render()
      expect(callbackFn.callCount).to.equal(initialCallCount + 1)
    })

    it('calls the initial result of the callback function', () => {
      render()
      refs[0].current = 'updatedA'
      render()
      expect(callbackTeardownFn.callCount).to.equal(1)
    })

    it('ignores a non-function result of the callback function', () => {
      callbackTeardownFn = 'not-a-function' as unknown as SinonStub
      render()
      refs[0].current = 'updatedA'
      expect(render).not.to.throw()
    })

    context('when removing the effect after changing call', () => {
      let nextTeardownFn: SinonStub

      beforeEach(() => {
        render()
        refs[0].current = 'updatedA'
        nextTeardownFn = sinon.stub()
        callbackFn.returns(nextTeardownFn)
        render()
      })

      it('calls the result of the latest callback function call', () => {
        component.unmount()
        expect(nextTeardownFn.callCount).to.equal(1)
      })

      it('does not call the result of earlier callback function calls', () => {
        const initialCallCount = callbackTeardownFn.callCount
        component.unmount()
        expect(callbackTeardownFn.callCount).to.equal(initialCallCount)
      })

      it('does not call the removal function twice when refs have changed again', () => {
        refs[0].current = 'updatedAgain'
        component.unmount()
        expect(nextTeardownFn.callCount).to.equal(1)
      })
    })
  })

  describe('when called again with additional refs', () => {
    it('calls the callback function', () => {
      render()
      const initialCallCount = callbackFn.callCount
      refs.push(createRefWith('refC'))
      render()
      expect(callbackFn.callCount).to.equal(initialCallCount + 1)
    })
  })
})
