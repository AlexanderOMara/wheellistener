'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Properties', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	var nonNull = {};
	var expected = {
		deltaMode: nonNull,
		deltaX: nonNull, // Partial.
		deltaY: nonNull,
		deltaZ: nonNull, // Partial.
		// MouseEvent
		altKey: nonNull,
		button: 0,
		buttons: nonNull, // Partial.
		clientX: nonNull,
		clientY: nonNull,
		ctrlKey: nonNull,
		metaKey: nonNull,
		offsetX: nonNull,
		offsetY: nonNull,
		relatedTarget: null,
		screenX: nonNull,
		screenY: nonNull,
		shiftKey: nonNull,
		which: 1,
		// UIEvent
		detail: 0,
		pageX: nonNull,
		pageY: nonNull,
		view: window,
		// Event
		bubbles: true,
		cancelable: true,
		currentTarget: testel,
		defaultPrevented: false,
		eventPhase: 2,
		target: testel,
		timeStamp: nonNull,
		type: 'wheel'
	};

	function cb(e) {
		for (var p in expected) {
			if (expected.hasOwnProperty(p)) {
				// If a browser does not support a property, then this test will fail.
				if (expected[p] === nonNull) {
					t.notEqual(e[p], null, p);
				}
				else {
					// Detect IE issue where a window by another name is not the same.
					if (p === 'view' && document.parentWindow) {
						// Use string comparison instead.
						t.equal('' + e[p], '' + expected[p], p);
					}
					else {
						t.equal(e[p], expected[p], p);
					}
				}
			}
		}
		body.removeChild(testel);
		wheellistener.remove(testel, cb);
		t.end();
	}
	wheellistener.add(testel, cb);
});
