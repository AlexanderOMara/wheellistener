'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Event.stopPropagation', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(3);

	var runOnce = false;
	function cbTestbox1(e) {
		e.stopPropagation();
		if (!runOnce) {
			t.pass('Event.stopPropagation called');
			// Wait a bit before determining if the event continued to propogate.
			window.setTimeout(function() {
				body.removeChild(testel);
				wheellistener.remove(window, cbWindow);
				wheellistener.remove(testel, cbTestbox1);
				t.pass('Finished without further propogation');
			}, 250);
		}
		runOnce = true;
	}
	function cbTestbox2() {
		t.pass('Event continued to finish with the element');
		wheellistener.remove(testel, cbTestbox2);
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
