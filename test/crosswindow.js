'use strict';

var test = require('tape');
var wheellistener = require('../src/wheellistener');
var testelement = require('./util/testelement');

test('Cross Window', function(t) {
	var window = global;
	var document = window.document;
	var body = document.body;

	t.plan(3);

	// Create another window in an iframe.
	var iframe = document.createElement('iframe');
	var iframeStyle = iframe.style;
	iframeStyle.position = 'fixed';
	iframeStyle.left = iframeStyle.top = '25%';
	iframeStyle.width = iframeStyle.height = '50%';
	body.appendChild(iframe);

	function iframeReady() {
		var iWindow = iframe.contentWindow;
		var iDocument = iWindow.document;
		var iBody = iDocument.body;

		// Create the test element inside that window.
		var testel = testelement(iDocument);
		testel.innerHTML = t.name + ': Wheel here to continue';
		iBody.appendChild(testel);

		var validTest = false;

		function cbMainWin(e) {
			if (validTest) {
				if (e.target === testel) {
					t.fail('Event should not bubble through frames.');
				}
			}
		}
		function cbEl(e) {
			validTest = true;
			wheellistener.remove(testel, cbEl);
			t.equals(e.currentTarget, testel, 'e.currentTarget = testel');
		}
		function cbDoc(e) {
			if (validTest) {
				wheellistener.remove(iDocument, cbDoc);
				wheellistener.remove(window, cbMainWin);
				t.equals(e.currentTarget, iDocument, 'e.currentTarget = iDocument');
				// Wait a bit to test if it bubbled.
				global.setTimeout(function() {
					body.removeChild(iframe);
					t.pass('Finished without event bubbling through frame.');
				}, 250);
			}
		}

		wheellistener.add(testel, cbEl);
		wheellistener.add(iDocument, cbDoc);
		wheellistener.add(window, cbMainWin);
	}

	// Wait for the frame to become ready.
	var pollInterval;
	var pollReady = function() {
		if (iframe.contentWindow.document.body) {
			global.clearInterval(pollInterval);
			iframeReady();
		}
	};
	pollInterval = global.setInterval(pollReady, 250);
});
