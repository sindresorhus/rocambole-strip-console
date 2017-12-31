import test from 'ava';
import rocambole from 'rocambole';
import m from '.';

function strip(string) {
	return rocambole.moonwalk(string, node => {
		m(node);
	}).toString();
}

test('strip console statement', t => {
	t.is(strip('function test(){console.log("foo");}'), 'function test(){void 0;}');
	t.is(strip('function test(){window.console.log("foo");}'), 'function test(){void 0;}');
	t.is(strip('"use strict";console.log("foo");foo()'), '"use strict";void 0;foo()');
	t.is(strip('if(console){console.log("foo", "bar");}'), 'if(console){void 0;}');
	t.is(strip('foo && console.log("foo");'), 'foo && void 0;');
	t.is(strip('if (foo) console.log("foo")\nnextLine();'), 'if (foo) void 0\nnextLine();');
});

test('never strip away non-debugging code', t => {
	const fixture = 'var test = {\n    getReadSections: function(){\n        var readSections = window.localStorage.getItem(\'storyReadSections\') || \'[]\';\n        return JSON.parse(readSections);\n    }\n};';
	t.is(strip(fixture), fixture);
});
