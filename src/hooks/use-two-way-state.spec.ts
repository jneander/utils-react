import {act, renderHook} from '@testing-library/react-hooks/dom'

import {useTwoWayState} from './use-two-way-state'

describe('Hooks > .useTwoWayState()', () => {
  let component: ReturnType<typeof renderHook>
  let externalValue: string
  let result: [string, (_value: string) => void]

  beforeEach(() => {
    component = null

    externalValue = 'example'
    render()
  })

  afterEach(() => {
    component.unmount()
  })

  function render() {
    if (component == null) {
      component = renderHook(() => (result = useTwoWayState(externalValue)))
    } else {
      component.rerender()
    }
  }

  describe('when initially called', () => {
    it('returns the given value', () => {
      expect(result[0]).to.equal('example')
    })

    it('returns a setter function', () => {
      expect(typeof result[1]).to.equal('function')
    })
  })

  describe('when called with a different value', () => {
    it('returns the new value', () => {
      externalValue = 'changed'
      render()
      expect(result[0]).to.equal('changed')
    })
  })

  describe('when the setter function is called', () => {
    it('returns the setter value', () => {
      act(() => result[1]('changed'))
      render()
      expect(result[0]).to.equal('changed')
    })

    describe('when the hook is subsequently called with a different value', () => {
      it('returns the new value', () => {
        act(() => result[1]('changed'))
        render()
        externalValue = 'changed again'
        render()
        expect(result[0]).to.equal('changed again')
      })
    })
  })
})
