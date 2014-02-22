'use strict';
var assert = require('assert');
var rocambole = require('rocambole');
var stripConsole = require('./index');

function strip(str) {
	return rocambole.moonwalk(str, function (node) {
			stripConsole(node);
	}).toString();
}

it('should strip console statement', function () {
	assert.equal(strip('function test(){console.log("foo");}'), 'function test(){void 0;}');
	assert.equal(strip('function test(){window.console.log("foo");}'), 'function test(){void 0;}');
	assert.equal(strip('"use strict";console.log("foo");foo()'), '"use strict";void 0;foo()');
	assert.equal(strip('if(console){console.log("foo", "bar");}'), 'if(console){void 0;}');
	assert.equal(strip('foo && console.log("foo");'), 'foo && void 0;');
	assert.equal(strip('if (foo) console.log("foo")\nnextLine();'), 'if (foo) void 0\nnextLine();');
});

it('should never strip away non-debugging code', function () {
	var t = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	assert.equal(strip(t), t);
});
