'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Delegation', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(6);

	// Flag for valid test.
	var validTest = false;

	function cbTestbox(e) {
		// jshint validthis:true
		validTest = true;
		t.equals(this, testel, 'this = testel');
		t.equals(e.currentTarget, testel, 'event.currentTarget = testel');
		t.equals(e.target, testel, 'event.target = testel');
	}
	function cbWindow(e) {
		// jshint validthis:true
		if (validTest) {
			// Ony run this test if scroll event was triggered in the right place.
			body.removeChild(testel);
			wheellistener.remove(testel, cbTestbox);
			wheellistener.remove(document, cbWindow);

			t.equals(this, document, 'this = document');
			t.equals(e.currentTarget, document, 'event.currentTarget = document');
			t.equals(e.target, testel, 'event.target = testel');
		}
	}

	wheellistener.add(testel, cbTestbox);
	wheellistener.add(document, cbWindow);
});
