import {act, render} from '@testing-library/react'
import sinon, {SinonSpy, SinonStub} from 'sinon'

import {DelayedContent, DelayedContentProps} from './delayed-content'

describe('Components > DelayedContent', () => {
  let $container: HTMLElement
  let props: Omit<DelayedContentProps, 'children'>
  let timeoutFn: Parameters<typeof setTimeout>[0]

  let setTimeoutStub: SinonStub
  let clearTimeoutSpy: SinonSpy

  beforeEach(async () => {
    setTimeoutStub = sinon
      .stub(window, 'setTimeout')
      .callsFake((fn: Parameters<typeof setTimeout>[0]) => {
        timeoutFn = () => act(fn)
        return 123 as unknown as ReturnType<typeof setTimeout>
      })

    clearTimeoutSpy = sinon.spy(window, 'clearTimeout')

    $container = document.body.appendChild(document.createElement('div'))

    props = {
      duration: 100,
      shouldDelay: true,
    }

    await renderComponent()
  })

  afterEach(() => {
    $container.remove()

    setTimeoutStub.restore()
    clearTimeoutSpy.restore()
  })

  async function renderComponent() {
    const element = (
      <DelayedContent {...props}>
        <span id="content">Content</span>
      </DelayedContent>
    )

    await render(element, {container: $container})
  }

  describe('when initially rendered', () => {
    it('does not render the given .children', () => {
      expect($container.querySelector('#content')).to.equal(null)
    })

    it('sets a timeout', () => {
      expect(timeoutFn).not.to.equal(null)
    })
  })

  describe('when the delay duration has elapsed', () => {
    it('renders the given .children', () => {
      timeoutFn()
      expect($container.querySelector('#content')).not.to.equal(null)
    })
  })

  describe('when the .shouldDelay prop changes from `true` to `false`', () => {
    beforeEach(async () => {
      props.shouldDelay = false
      await renderComponent()
    })

    it('renders the given .children immediately', () => {
      expect($container.querySelector('#content')).not.to.equal(null)
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
