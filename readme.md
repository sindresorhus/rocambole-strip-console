# rocambole-strip-console [![Build Status](https://travis-ci.org/sindresorhus/rocambole-strip-console.svg?branch=master)](https://travis-ci.org/sindresorhus/rocambole-strip-console)

> Strip console statements from a [`rocambole`](https://github.com/millermedeiros/rocambole) AST


## Install

```
$ npm install rocambole-strip-console
```


## Usage

```js
const rocambole = require('rocambole');
const stripconsole = require('rocambole-strip-console');

rocambole.moonwalk('if (true) { console.log("foo"); }', node => {
	stripConsole(node);
}).toString();
//=> 'if (true) { void 0; }'
```

To prevent any side-effects, `console.*` is replaced with `void 0` instead of being removed.


## License

MIT © [Sindre Sorhus](https://sindresorhus.com)
