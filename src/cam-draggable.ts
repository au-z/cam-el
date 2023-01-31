import { define, Descriptor, html } from 'hybrids'

export const CamDraggable = define<any>({
  tag: 'cam-draggable',
  zIndex: 1,
  __draggable__: { value: undefined, connect: Draggable() },
  render: ({ zIndex }) => html`<slot style="cursor: pointer;"></slot>`.css`:host {
    z-index: ${zIndex};
  }`,
})

export function Draggable(options?: { absolutePositioning: boolean }): Descriptor<any, any>['connect'] {
  options = {
    absolutePositioning: false,
    ...(options || {}),
  }

  let [x0, y0] = [0, 0]
  let [x1, y1] = [0, 0]
  let [xOffset, yOffset] = [0, 0]
  let dragging = false

  let onMouseDown, onMouseMove, onMouseUp, onTouchStart, onTouchMove, onTouchEnd

  function draggableStart(host: HTMLElement, e: DragEvent | TouchEvent) {
    e.stopPropagation()
    if (!e) return
    if (e instanceof TouchEvent) {
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

  function draggableEnd(host: HTMLElement, e) {
    x0 = x1
    y0 = y1
    dragging = false

    window.removeEventListener('mousemove', onMouseMove)
    window.removeEventListener('mouseup', onMouseUp)
    window.removeEventListener('touchmove', onTouchMove)
    window.removeEventListener('touchend', onTouchEnd)
  }

  function draggableDrag(host: HTMLElement, e: DragEvent | TouchEvent) {
    if (!dragging) return
    e.preventDefault()

    if (e instanceof TouchEvent) {
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

  return (host: HTMLElement) => {
    if (options.absolutePositioning) {
      xOffset = parseFloat(/\d+/.exec(host.style.left)[0])
      yOffset = parseFloat(/\d+/.exec(host.style.top)[0])
    }

    onMouseDown = draggableStart.bind(null, host)
    onTouchStart = draggableStart.bind(null, host)
    onMouseMove = draggableDrag.bind(null, host)
    onTouchMove = draggableDrag.bind(null, host)
    onMouseUp = draggableEnd.bind(null, host)
    onTouchEnd = draggableEnd.bind(null, host)

    host.addEventListener('mousedown', onMouseDown)
    host.addEventListener('touchstart', onTouchStart)

    // disconnect callback
    return () => {
      host.removeEventListener('mousedown', onMouseDown)
      host.removeEventListener('touchstart', onTouchStart)
    }
  }
}
