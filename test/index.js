'use strict';

// Testing requires actual browser, only place testing actually makes sense.
if (!global.document) {
	throw new Error('Tests must be run in a browser.');
}

require('./addremove');
require('./properties');
require('./delegation');
require('./eventphase');
require('./preventdefault');
require('./stoppropagation');
require('./stopimmediatepropagation');
require('./crosswindow');
