'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Event.preventDefault', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.style.lineHeight = 2;
	testel.style.overflow = 'scroll';
	testel.innerHTML = t.name + ': Wheel here to continue' +
		'<p style="width: 110%; height: 110%;">...</p>'; //Force overflow.
	body.appendChild(testel);
	// For old browsers with fixed problems.
	var bodyHeight = body.style.height;
	body.style.height = '100%';

	t.plan(4);

	// Flag for valid test.
	var validTest = false;
	var startingScrollPosition = 10;

	function cbTestbox(e) {
		e.preventDefault();
		// Only do this on first call.
		if (!validTest) {
			t.ok(e.defaultPrevented, 'Event.defaultPrevented = true');
			// Wait a bit before determining if the values have changed.
			window.setTimeout(function() {
				wheellistener.remove(testel, cbTestbox);
				var scrollTop = testel.scrollTop;
				var scrollLeft = testel.scrollLeft;
				body.removeChild(testel);
				body.style.height = bodyHeight;
				t.equal(scrollTop, startingScrollPosition, 'scrollTop unchanged');
				t.equal(scrollLeft, startingScrollPosition, 'scrollLeft unchanged');
			}, 1000);
		}
		validTest = true;
	}
	function cbWindow() {
		if (validTest) {
			t.pass('Event continued after Event.preventDefault');
			wheellistener.remove(window, cbWindow);
		}
	}
	testel.scrollTop = testel.scrollLeft = startingScrollPosition;

	wheellistener.add(testel, cbTestbox);
	wheellistener.add(window, cbWindow);
});
