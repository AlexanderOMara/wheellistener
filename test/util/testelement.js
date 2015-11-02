'use strict';

module.exports = function(doc) {
	var testel = doc.createElement('div');
	var testels = testel.style;
	testels.position = 'fixed';
	testels.left = testels.top = '25%';
	testels.width = testels.height = '50%';
	testels.border = '1px solid #999';
	testels.background = '#CCC';
	testels.textAlign = 'center';
	testels.fontSize = '2em';
	return testel;
};
