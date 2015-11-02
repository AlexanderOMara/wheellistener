# wheellistener

Cross-browser wheel event listener.


## Overview

Historically, scroll wheel event models have varied wildly across browsers. Existing solutions to try to resolve them are half-baked and missing basic functionality such as proper feature-detection and the ability to remove an event listener. All of these issues seems simple, but are actually quite complex to implement properly, and without memory leaks.

That's why I created this library.

This library takes care of all the issues of feature detection and transparently passes the event callback straight into the native event listener for no loss in performance in modern browsers. For those older browsers that need a little help, the event callback is wrapped and a new event object is created to normalize the event properties, even in legacy IE. This library even emulates the capture and bubble phases for legacy IE, for a consistent API. It is even possible to attach events across window objects, so attaching events inside an iframe just works.

All of that is wrapped up in a UMD module ready to work with your favorite tools, and unit tested to ensure it works with you least-favorite (and favorite) browsers.


## Usage

Load up the library using `require`, `define`, or a `script` tag to get the `wheellistener` object and expose the following API.

### Add Event

```js
wheellistener.add(elem, listener[, useCapture]);
```

### Remove Event

```js
wheellistener.remove(elem, listener[, useCapture]);
```

### Polyfilled Event Constructor

```js
wheellistener.WheelEventShim
```

If the browser natively support the modern `wheel` event, then the native event object is returned to the callback function. Otherwise, a wrapper object is returned which normalizes most of the event object properties.

The following event properties and methods are supported by the polyfilled event object, with usage identical to their native counterparts.

### Properties

- `altKey`
- `bubbles`
- `button`
- `buttons` (partial)
- `cancelable`
- `clientX`
- `clientY`
- `ctrlKey`
- `currentTarget`
- `defaultPrevented`
- `deltaMode`
- `deltaX` (partial)
- `deltaY`
- `deltaZ` (partial)
- `detail`
- `eventPhase`
- `metaKey`
- `offsetX` (partial)
- `offsetY` (partial)
- `pageX`
- `pageY`
- `relatedTarget`
- `screenX`
- `screenY`
- `shiftKey`
- `target`
- `timeStamp`
- `type`
- `view`
- `which`

### Methods

- `getModifierState`
- `preventDefault`
- `stopPropagation`
- `stopImmediatePropagation`

### Additional Properties

- `originalEvent` (contains original browser event object)

Those marked with partial support are impractical to polyfill or have historically inconsistent implementations, and are not fully supported in all browsers. See compatibility notes below to see which browsers these are unavailable in.


## Examples

### Adding an event listener

```js
function callback(e) {
	console.log(e);
}
wheellistener.add(elem, callback);
```

### Removing an event listener

```js
wheellistener.add(elem, callback);
```

### Detecting polyfilled event object

```js
function callback(e) {
	if (e instanceof wheellistener.WheelEventShim) {
		console.log('Polyfilled');
	}
	else {
		console.log('Native');
	}
}
wheellistener.add(elem, callback);
```


## Compatibility

### Fully Supported

The following browser implement the native `wheel` event and are fully supported.

- Firefox 18+
- Chrome 31+
- Internet Explorer 9+ (includes Edge)
- Safari 8+, 7.1.8+, 6.2.8+
- Opera 18+

### Partially Supported

The following browsers do not implement the native `wheel` event, and so are missing event properties that are not practical to polyfill.

- Firefox 15 - 17
  - `offsetX`
  - `offsetY`
- Firefox 3.5 - 14
  - `buttons`
  - `offsetX`
  - `offsetY`
- Firefox 1.5 - 3
  - `buttons`
  - `deltaX`
  - `deltaZ`
  - `offsetX`
  - `offsetY`
- Chrome 7 - 30
  - `buttons`
  - `deltaZ`
- Internet Explorer 6 - 8
  - `buttons`
  - `deltaX`
  - `deltaZ`
- Safari 4.0.4 - 6.2.7, 7.0 - 7.1.7
  - `buttons`
  - `deltaZ`
- Opera 12.10 - 17
  - `buttons`
  - `deltaZ`
- Opera 11.50 - 12.02
  - `buttons`
  - `deltaX`
  - `deltaZ`


## Bugs

If you find a bug or have compatibility issues, please open a ticket under issues section for this repository.


## License

Copyright (c) 2015 Alexander O'Mara

Licensed under the Mozilla Public License, v. 2.0.

If this license does not work for you, feel free to contact me.


## Donations

If you find my software useful, please consider making a modest donation on my website at [alexomara.com](http://alexomara.com).
