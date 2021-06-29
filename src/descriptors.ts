export const onRender = <E extends HTMLElement>(observe: (host?: E, root?: DocumentFragment, last?: DocumentFragment) => void) => ({
	get: ({render}) => render(),
	observe,
})