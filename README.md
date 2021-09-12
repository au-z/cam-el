# cam-el
> Foundational Web Components with Smooth Character

<p align="center">
  <img width="240" height="240" src="https://i.imgur.com/9b3r9LK.png">
</p>

These components should help with boilerplate html layout. They're built to be modern, maximally helpful, and minimally intrusive.

## Usage
```bash
npm i @auzmartist/cam-el
```

```js
import {CamBox, CamInput} from '@auzmartist/cam-el'
```

# Components
As per the web components spec, all components are hyphenated. All `cam-el` components are prefixed with `cam-`.

## Layout

### `<cam-box>`
A flex-sensible div replacer. Layout everything with cam-box.

Example:
```html
<cam-box m="2" flex="space-evenly center">
	<cam-box p="2 4">Foo</cam-box>
	<cam-box p="2 4">Bar</cam-box>
</cam-box>
```

![cam-box](https://i.imgur.com/Kd3quCq.png)

#### Attributes
- **m**: margin `"xy | x y"`
- **p**: padding `"xy | x y"`
- **flex**: sets the flex justify-content and align-items properties `"justify/align | justify align"`
- **inline** if set, display with be inline-flex or inline-block
- **dir**: sets the flex-direction
- **wrap**: the flex-wrap rule value

## Forms

### `<cam-input>`
An unopinionated input element which adds useful functionality and smooths over browser quirks.

#### General Attributes
- **m**: margin `"xy | x y"`
- **p**: padding `"xy | x y"`
- **disabled**: disables the input
- **slot**: An optional slot on the left of the input for a label or other content
- **value**: the current value of the input

#### General Events
- **oninput**: CustomEvent wherein the detail is the current value of the input.

#### Text
Proxies the text input.

```html
<cam-input type="text" placeholder="hint" label></cam-input>
```
#### Number Input
Proxies the number input and adds features for wraparound value nudging and value clamping. Great for scientific or visualization heavy applications where

Examples:
```html
<cam-input type="number" min="0" max="1" step="0.01" wrap></cam-input>
```
#### Attributes
- **min**: minimum value
- **max**: maximum value
- **step**: step value
- **wrap**: determines if the min and max should "wrap around"

#### Checkbox/Toggle Input
```html
<cam-input type="checkbox"></cam-input>
<cam-input type="checkbox" toggle></cam-input>
```

#### Attributes
- **toggle**: An alternate UI resembling a horizontal slider
- **checked**: Indicates if the checkbox is checked or toggle is on

#### Radio Input
Because inputs do not share a "name" attribute across shadow DOMs, it's recommended to wrap groups of these in <cam-radio-group> to enforce mutual exclusion and subscribe to the group element's `oninput` event.
```html
<cam-radio-group name="contact">
	<cam-input type="radio" label="email" value="email"></cam-input>
	<cam-input type="radio" label="phone" value="phone"></cam-input>
	<cam-input type="radio" label="text" value="text"></cam-input>
</cam-radio-group>
```

#### Email
Proxies the email input

#### Password
Proxies the password input

One could make `<input>` work their full time job. Other `<input>` variants and improved browser/accessibility support are in development as-needed. Submit an issue if there's something missing you'd like to use.

## Typography

### `<cam-icon>`
A dead simple way to use Material Icon ligature fonts.

```html
<!-- IMPORTANT - this prerequisite stylesheet is required -->
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

<cam-icon>face</cam-icon> <!--renders a face - no joke :) -->
```

## Color

### `<cam-swatch>`
Render a color swatch in RGB, HSL, or hexadecimal format.
Perfect for presenting a color in UI.

```html
<cam-swatch r="3" g="25" b="38"></cam-swatch>
<cam-swatch h="175" s="20" l="68" hide-label></cam-swatch>
<cam-swatch hex="F4E9CD"></cam-swatch>
```

### `<cam-hsl>`
Render an editable HSL color generator.

```html
<cam-hsl h="175" s="20" l="68" a="0.5"></cam-hsl>
```

#### Events:
- change: {h, s, l, hex}

## Interaction

### `<cam-draggable>`
Touch and mouse support for draggable slotted content.

```html
<!-- A draggable red color swatch -->
<cam-draggable><cam-swatch hex="ff0000"></cam-swatch></cam-draggable>
```

If you'd prefer to work with the raw eventListeners (`draggableStart`, `draggableDrag`, and `draggableEnd`), you can `import {Draggable} from 'cam-el'` into your project as function getters.

## Miscellaneous / Advanced
These components are much less helpful in isolation, but can be used to supercharge further development with Hybrids JS web components.

### `CamRef`
Used in conjunction with other renderable Hybrids components to provide a reference into a Custom Element's shadow DOM.

#### Usage
```js
export const MyComponent = {
	...CamRef('.some-class'),
	render: () => html`<some-child
		onref="${onRef}">
		</some-child>
	`,
}

function onRef(host, e) {
	/* e.detail will be child component's .some-class element */
}
```

---

## ::part() styles
The library supports style bindings using the ::part() CSS selector modifier for a high degree of customization.

Example
```html
<cam-input label="Label"/>
<style>
	cam-input::part(input) {
		border-radius: 0;
	}
	cam-input::part(label) {
		font-family: 'Arial', sans-serif;
	}
</style>
```

## CSS Variables
- `var(--cam-font, sans-serif)`: the font for all elements
- `var(--cam-unit, 8px)`: the size of a margin and padding unit