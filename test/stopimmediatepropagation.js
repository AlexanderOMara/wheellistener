'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Event.stopImmediatePropagation', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(2);

	var runOnce = false;
	function cbTestbox1(e) {
		e.stopImmediatePropagation();
		if (!runOnce) {
			t.pass('Event.stopImmediatePropagation called');
			// Wait a bit before determining if the event continued to propogate.
			window.setTimeout(function() {
				body.removeChild(testel);
				wheellistener.remove(window, cbWindow);
				wheellistener.remove(testel, cbTestbox2);
				wheellistener.remove(testel, cbTestbox1);
				t.pass('Finished without further propogation');
			}, 250);
		}
		runOnce = true;
	}
	function cbTestbox2() {
		t.fail('Event continued to propogate on the same element.');
	}
	function cbWindow(e) {
		// Validate event.
		if (e.target === testel) {
			t.fail('Event continued to propogate up to the window.');
		}
	}

	wheellistener.add(testel, cbTestbox1);
	wheellistener.add(testel, cbTestbox2);
	wheellistener.add(window, cbWindow);
});
