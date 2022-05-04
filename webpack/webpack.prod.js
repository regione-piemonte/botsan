const webpack = require('webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpackMerge = require('webpack-merge');
const Visualizer = require('webpack-visualizer-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');
const sass = require('sass');

const utils = require('./utils.js');
const commonConfig = require('./webpack.common.js');

const webpackEnvVar = require('./webpack.prod.env.js');

module.exports = (options) => webpackMerge(commonConfig(webpackEnvVar.data), {
	mode: utils.removeQuotes(webpackEnvVar.data.NODE_ENV),
	entry: {
		main: './src/main/webapp/app/index'
	},
	output: {
		path: utils.root('build/resources/main/static/'),
		filename: 'app/' + utils.removeQuotes(webpackEnvVar.data.BUNDLE_NAME) + '.js',
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.s?css$/,
				loader: 'stripcomment-loader'
			},
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
					{
						loader: 'css-loader',
						options: {
							sourceMap: false,
							modules: {
								auto: /\.component\.(sa|sc|c)ss$/i,
							}
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
			}
		]
	},
	optimization: {
		runtimeChunk: false,
		minimizer: [
			new TerserPlugin({
				cache: true,
				parallel: true,
				terserOptions: {
					ecma: 6,
					toplevel: true,
					module: true,
					beautify: false,
					comments: false,
					compress: {
						warnings: false,
						ecma: 6,
						module: true,
						toplevel: true
					},
					output: {
						comments: false,
						beautify: false,
						indent_level: 2,
						ecma: 6
					},
					mangle: {
						keep_fnames: true,
						module: true,
						toplevel: true
					}
				}
			}),
			new OptimizeCSSAssetsPlugin({})
		]
	},
	plugins: [
		new BundleAnalyzerPlugin({
			analyzerMode: 'static',
			generateStatsFile: true,
			logLevel: 'info',
			reportFilename: utils.root('build/report/bundle_analyzer/report.html'),
			statsFilename: utils.root('build/report/bundle_analyzer/stats.json')
		}),
		new MiniCssExtractPlugin({
			filename: 'app/' + utils.removeQuotes(webpackEnvVar.data.BUNDLE_NAME) + '.css',
		}),
		new MomentLocalesPlugin({
			localesToKeep: [
				'it',
				'en'
			]
		}),
		new Visualizer({
			filename: '../../../report/visualizer/stats.html'
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false
		}),
		new WorkboxPlugin.GenerateSW({
			clientsClaim: true,
			skipWaiting: true,
			exclude: [/swagger-ui/]
		})
	]
});
