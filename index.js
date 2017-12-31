'use strict';
const updateNode = require('rocambole-node-update');

module.exports = node => {
	if (node.type !== 'CallExpression') {
		return;
	}

	const expression = node.callee;

	if (expression && expression.type !== 'MemberExpression') {
		return;
	}

	let main = expression.object;

	// Collapse `window`
	if (main && main.type === 'MemberExpression' && main.object && main.object.type === 'Identifier' && main.object.name === 'window' && main.property) {
		main = main.property;
	}

	if (main && main.type === 'Identifier' && main.name === 'console' && expression.property) {
		updateNode(node, 'void 0');
	}
};
