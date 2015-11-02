'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Add Detect Remove', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(1);

	function cb(e) {
		wheellistener.remove(testel, cb);
		body.removeChild(testel);
		t.pass('Event type: ' + (e instanceof wheellistener.WheelEventShim ? 'Polyfill' : 'Native'));
	}
	wheellistener.add(testel, cb);
});

test('Add Once Remove Once', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(1);

	function callback() {
		t.fail('callback should not fire.');
	}
	wheellistener.add(testel, callback);
	wheellistener.remove(testel, callback);

	function cbfinish() {
		wheellistener.remove(testel, cbfinish);
		// Wait a bit just to be extra sure.
		window.setTimeout(function() {
			body.removeChild(testel);
			t.pass('Removed callback not fired.');
		}, 250);
	}
	wheellistener.add(testel, cbfinish);
});

test('Add Twice Remove Once', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(1);

	function callback() {
		t.fail('callback should not fire.');
	}
	wheellistener.add(testel, callback);
	wheellistener.add(testel, callback);
	wheellistener.remove(testel, callback);

	function cbfinish() {
		wheellistener.remove(testel, cbfinish);
		// Wait a bit just to be extra sure.
		window.setTimeout(function() {
			body.removeChild(testel);
			t.pass('Removed callback not fired.');
		}, 250);
	}
	wheellistener.add(testel, cbfinish);
});

test('Add Twice Call Once', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	var testel = testelement(document);
	testel.innerHTML = t.name + ': Wheel here to continue';
	body.appendChild(testel);

	t.plan(1);

	var lastEvent = null;
	function callback(e) {
		//If same event as last one, then attached multiple times.
		if (lastEvent === e) {
			t.fail('callback fired multiple times for the same event.');
		}
		//On first callback, set timeout to remove callback and finish the test.
		if (lastEvent === null) {
			window.setTimeout(function() {
				body.removeChild(testel);
				wheellistener.remove(testel, callback);
				t.pass('callback only attached once per event.');
			}, 250);
		}
		lastEvent = e;
	}
	wheellistener.add(testel, callback);
	wheellistener.add(testel, callback);
});
