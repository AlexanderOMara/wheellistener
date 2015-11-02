'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Event Phase', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(8);

	var callCounter = 0;
	function callbackWindow1(e) {
		// Validate the test.
		if (e.target === testel) {
			t.equals(++callCounter, 1, '1: window capture phase');
			t.equals(e.eventPhase, 1, 'event.eventPhase = 1');
			wheellistener.remove(window, callbackWindow1, true);
		}
	}
	function callbackTestbox1(e) {
		// Validate the test.
		if (e.target === testel) {
			t.equals(++callCounter, 2, '2: element capture phase');
			t.equals(e.eventPhase, 2, 'event.eventPhase = 2');
			wheellistener.remove(testel, callbackTestbox1, true);
		}
	}
	function callbackTestbox0(e) {
		// Validate the test.
		if (e.target === testel) {
			t.equals(++callCounter, 3, '3: element bubble phase');
			t.equals(e.eventPhase, 2, 'event.eventPhase = 2');
			wheellistener.remove(testel, callbackTestbox0, false);
		}
	}
	function callbackWindow0(e) {
		// Validate the test.
		if (e.target === testel) {
			t.equals(++callCounter, 4, '4: window bubble phase');
			t.equals(e.eventPhase, 3, 'event.eventPhase = 3');
			wheellistener.remove(window, callbackWindow0, false);
			body.removeChild(testel);
		}
	}
	wheellistener.add(window, callbackWindow1, true);
	wheellistener.add(testel, callbackTestbox1, true);
	wheellistener.add(testel, callbackTestbox0, false);
	wheellistener.add(window, callbackWindow0, false);
});
