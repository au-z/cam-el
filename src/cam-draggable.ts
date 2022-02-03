import { define, html } from 'hybrids'

export function Draggable(options?: { absolutePositioning: boolean }) {
  options = {
    absolutePositioning: false,
    ...(options || {}),
  }

  let [x0, y0] = [0, 0]
  let [x1, y1] = [0, 0]
  let [xOffset, yOffset] = [0, 0]
  let dragging = false

  let onMouseMove, onMouseUp, onTouchMove, onTouchEnd

  function draggableInit(host) {
    if (options.absolutePositioning) {
      xOffset = parseFloat(/\d+/.exec(host.style.left)[0])
      yOffset = parseFloat(/\d+/.exec(host.style.top)[0])
    }

    onMouseMove = draggableDrag.bind(null, host)
    onTouchMove = draggableDrag.bind(null, host)
    onMouseUp = draggableEnd.bind(null, host)
    onTouchEnd = draggableEnd.bind(null, host)
  }

  function draggableStart(host, e) {
    e.stopPropagation()
    if (!e) return
    if (e.type === 'touchstart') {
      x0 = e.touches[0].clientX - xOffset
      y0 = e.touches[0].clientY - yOffset
    } else {
      x0 = e.clientX - xOffset
      y0 = e.clientY - yOffset
    }
    dragging = true

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
    window.addEventListener('touchmove', onTouchMove)
    window.addEventListener('touchend', onTouchEnd)
  }

  function draggableEnd(host, e) {
    x0 = x1
    y0 = y1
    dragging = false

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  function draggableDrag(host, e) {
    if (!dragging) return
    e.preventDefault()

    if (e.type === 'touchmove') {
      x1 = e.touches[0].clientX - x0
      y1 = e.touches[0].clientY - y0
    } else {
      x1 = e.clientX - x0
      y1 = e.clientY - y0
    }

    xOffset = x1
    yOffset = y1

    if (options.absolutePositioning) {
      host.style.left = `${x1}px`
      host.style.top = `${y1}px`
    } else {
      host.style.transform = `translate3d(${x1}px, ${y1}px, 0)`
    }
  }

  return {
    draggableInit,
    draggableStart,
  }
}

export interface DraggableElement extends HTMLElement {
  draggableStart: () => (host: DraggableElement, e: Event) => void
  draggableDrag: () => (host: DraggableElement, e: Event) => void
  draggableEnd: () => (host: DraggableElement, e: Event) => void
}

export const CamDraggable = define<DraggableElement>({
  tag: 'cam-draggable',
  ...Draggable(),
  render: (host) => html`<slot
    style="${{ cursor: 'pointer' }}"
    onmousedown="${host.draggableStart}"
    ontouchstart="${host.draggableStart}"
    onmousemove="${host.draggableDrag}"
    ontouchmove="${host.draggableDrag}"
    onmouseup="${host.draggableEnd}"
    ontouchend="${host.draggableEnd}"
  ></slot>`,
})
