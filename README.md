# cam-el
> Foundational Web Components

These components should help with boilerplate html layout. They're built to be modern, maximally helpful, and minimally intrusive.

## Components
As per web components spec, all components are hyphenated. All `cam-el` components are prefixed with `cam-`.

### `<cam-box>`
A flex-sensible div replacer. Layout everything with cam-box.

Example:
```html
<cam-box m="2" flex="space-evenly center">
	<cam-box p="2 4">Foo</cam-box>
	<cam-box p="2 4">Bar</cam-box>
</cam-box>
```

![cam-box](https://imgur.com/Kd3quCq)

#### Attributes
- **m**: margin `"xy | x y"`
- **p**: padding `"xy | x y"`
- **flex**: sets the flex justify-content and align-items properties `"justify/align | justify align"`
- **inline** if set, display with be inline-flex or inline-block
- **dir**: sets the flex-direction

#### CSS Variables
- `var(--cam-unit, 8px)`: the size of a margin and padding unit

#### CSS Parts
- `box`: the outer div element for application of other ::part styles

```css
cam-box::part(box) {
	border: 1px solid gray;
}
```


