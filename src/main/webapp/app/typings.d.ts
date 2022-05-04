// SPDX-License-Identifier: MIT
// Copyright Regione Piemonte - 2022

declare module '*.json' {
	const value: any;
	export default value;
}

// [i] Import CSS modules with Typescript, React and Webpack
//
// TypeScript does not know that there are files other than .ts or .tsx so it will throw
// an error if an import has an unknown file suffix.
//
// If you have a webpack config that allows you to import other types of files, you have
// to tell the TypeScript compiler that these files exist. To do so add a declaration file
// in which you declare modules with fitting names.
//
// The content of the module to declare depends on the webpack loader used for the file
// type. In a webpack configuration that pipes *.scss files through sass-loader → css-loader → style-loader,
// there will be no content in the imported module, and the correct module declaration
// would look like this:
// declare module "*.scss";

declare module "*.scss";


// To use non-code assets with TypeScript, we need to defer the type for these imports.
// This requires a custom.d.ts file which signifies custom definitions for TypeScript in our project. Let's set up a declaration for .svg files:

declare module "*.svg" {
	const content: any;
	export default content;
}
