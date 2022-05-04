const path = require('path');
const webpack = require('webpack');
const {BaseHrefWebpackPlugin} = require('base-href-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const MergeJsonWebpackPlugin = require('merge-jsons-webpack-plugin');

const packageJson = require('./../package.json');
const utils = require('./utils.js');

const getTsLoaderRule = env => {
	const rules = [
		{
			loader: 'cache-loader',
			options: {
				cacheDirectory: path.resolve('build/cache-loader')
			}
		},
		{
			loader: 'thread-loader',
			options: {
				workers: require('os').cpus().length - 1
			}
		},
		{
			loader: 'ts-loader',
			options: {
				transpileOnly: true,
				happyPackMode: true
			}
		}
	];
	if (env === 'development') {
		rules.unshift({
			loader: 'react-hot-loader/webpack'
		});
	}
	return rules;
};

module.exports = (options) => ({
	cache: options.NODE_ENV !== 'production',
	resolve: {
		extensions: [
			'.js', '.jsx', '.ts', '.tsx', '.json'
		],
		modules: ['node_modules'],
		alias: utils.mapTypescriptAliasToWebpackAlias()
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: getTsLoaderRule(options.NODE_ENV),
				include: [utils.root('./src/main/webapp/app')],
				exclude: [utils.root('node_modules')]
			},
			// {
			// 	test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
			// 	loader: 'file-loader',
			// 	options: {
			// 		digest: 'hex',
			// 		hash: 'sha512',
			// 		// name: 'content/[hash].[ext]'
			// 		name: utils.removeQuotes(options.CONTENT_PATH) + '[hash].[ext]'
			// 	}
			// },
			{
				test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
				// loader: 'url-loader?limit=100000'
				loader: 'url-loader?limit=' + (100*1024)
			},
			{
				enforce: 'pre',
				test: /\.jsx?$/,
				loader: 'source-map-loader'
			},
			{
				test: /\.(j|t)sx?$/,
				enforce: 'pre',
				loader: 'eslint-loader',
				exclude: [utils.root('node_modules')]
			}
		]
	},
	stats: {
		children: false
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': options
		}),
		new ForkTsCheckerWebpackPlugin({eslint: true}),
		new CopyWebpackPlugin([
			{from: './src/main/webapp/content/', to: 'content'},
			{from: './src/main/webapp/favicon.ico', to: 'favicon.ico'},
			{from: './src/main/webapp/manifest.webapp', to: 'manifest.webapp'},
			{from: './src/main/webapp/robots.txt', to: 'robots.txt'}
		]),
		new HtmlWebpackPlugin({
			template: './src/main/webapp/index.html',
			chunksSortMode: 'dependency',
			inject: 'body'
		}),
		new BaseHrefWebpackPlugin({baseHref: utils.removeQuotes(options.BASE_HREF)}),
		new MergeJsonWebpackPlugin({
			output: {
				groupBy: [
					{pattern: "./src/main/webapp/i18n/it/*.json", fileName: "./i18n/it.json"},
					{pattern: "./src/main/webapp/i18n/en/*.json", fileName: "./i18n/en.json"}
				]
			}
		}),
	]
});
