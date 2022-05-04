const path = require('path');
const tsconfig = require('../tsconfig.json');
const packageJson = require('../package.json');

module.exports = {
	getName,
	getDescription,
	getTimestamp,
	getVersion,
	removeQuotes,
	root,
	mapTypescriptAliasToWebpackAlias
};

function getName() {
	return packageJson.name;
}

function getDescription() {
	return packageJson.description;
}

function getTimestamp() {
	return new Date().getTime();
}

function getVersion() {
	return packageJson.version;
}

function removeQuotes(strWithQuotes) {
	return strWithQuotes.replace(/^'(.*)'$/, '$1');
}

const _root = path.resolve(__dirname, '..');

function root(args) {
	args = Array.prototype.slice.call(arguments, 0);
	const result = path.join.apply(path, [_root].concat(args));
	return result;
}

function mapTypescriptAliasToWebpackAlias(alias = {}) {
	const webpackAliases = { ...alias };
	if (!tsconfig.compilerOptions.paths) {
		return webpackAliases;
	}
	Object.entries(tsconfig.compilerOptions.paths)
		.filter(([key, value]) => {
			return !!value.length;
		})
		.map(([key, value]) => {
			const regexToReplace = /\/\*$/;
			const aliasKey = key.replace(regexToReplace, '');
			const aliasValue = value[0].replace(regexToReplace, '');
			return [aliasKey, root(aliasValue)];
		})
		.reduce((aliases, [key, value]) => {
			aliases[key] = value;
			return aliases;
		}, webpackAliases);
	return webpackAliases;
}
