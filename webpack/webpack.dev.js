const webpack = require('webpack');
const writeFilePlugin = require('write-file-webpack-plugin');
const webpackMerge = require('webpack-merge');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const SimpleProgressWebpackPlugin = require('simple-progress-webpack-plugin');
const WebpackNotifierPlugin = require('webpack-notifier');
const path = require('path');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const webpackEnvVar = require('./webpack.dev.env.js');

module.exports = (options) => webpackMerge(commonConfig(webpackEnvVar.data), {
	devtool: 'cheap-module-source-map',
	mode: utils.removeQuotes(webpackEnvVar.data.NODE_ENV),
	entry: [
		'./src/main/webapp/app/index'
	],
	output: {
		path: utils.root('build/resources/main/static/'),
		filename: 'app/[name].bundle.js',
		chunkFilename: 'app/[id].chunk.js'
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					'style-loader',
					{
						loader: 'css-loader',
						options: {
							sourceMap: true,
							modules: {
								auto: (resourcePath) => {
									const regexp = /\.component\.(sa|sc|c)ss$/i;
									const result = regexp.test(resourcePath);

									console.log('[webpack.dev.js] resourcePath=' + resourcePath + ', result=' + result + ', module=' + (result ? 'ON' : 'OFF'));
									return result;
								},
								localIdentName: '[name]__[local]__[hash:base64:5]',
							},
							localsConvention: 'asIs',
						}
					},
					'postcss-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: sass
						}
					}
				]
			},
		]
	},
	devServer: {
		stats: options.stats,
		hot: true,
		contentBase: './build/resources/main/static/',
		proxy: [{
			context: [
				'/api',
				'/services',
				'/management',
				'/swagger-resources',
				'/v2/api-docs',
				'/h2-console',
				'/auth'
			],
			target: utils.removeQuotes(webpackEnvVar.data.WEBPACK_PROXY_TARGET),

			secure: false,
			changeOrigin: options.tls
		}],
		watchOptions: {
			ignored: /node_modules/
		},
		https: options.tls,
		historyApiFallback: true
	},
	stats: process.env.JHI_DISABLE_WEBPACK_LOGS ? 'none' : options.stats,
	plugins: [
		process.env.JHI_DISABLE_WEBPACK_LOGS
			? null
			: new SimpleProgressWebpackPlugin({
					format: options.stats === 'minimal' ? 'compact' : 'expanded'
				}),
		new FriendlyErrorsWebpackPlugin(),
		new BrowserSyncPlugin({
			https: options.tls,
			host: 'localhost',
			port: 9000,
			proxy: {
				target: `http${options.tls ? 's' : ''}://localhost:9060`,
					proxyOptions: {
						changeOrigin: false
					}
			},
			socket: {
				clients: {
					heartbeatTimeout: 60000
				}
			}
		}, {
			reload: false
		}),
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new writeFilePlugin(),
		new webpack.WatchIgnorePlugin([
			utils.root('src/test'),
		]),
		new WebpackNotifierPlugin({
			title: 'SSB - BOTSAN',
			contentImage: path.join(__dirname, 'logo-ssb.png')
		})
	].filter(Boolean)
});
