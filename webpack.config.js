const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, "dist"),
		filename: 'paella-player.js',
		sourceMapFilename: 'paella-player.js.map'
	},
	devtool: 'source-map',
	devServer: {
		port: 8080,
		allowedHosts: 'all',
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
			"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
		}
	},
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},

			{
				test: /\.js$/,
				enforce: 'pre',
				use: ['source-map-loader']
			},

			{
				test: /\.css$/,
				use:  [
					'style-loader',
					'css-loader'
				]
			},

			{
				test: /\.svg$/i,
				use: {
					loader: 'svg-inline-loader'
				}
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader']
			}
		]
	},
	
	plugins: [
		new CopyWebpackPlugin({
			patterns: [
				{ from: './public', to: '' },
				{ from: './config', to: 'config' },				
				{ from: './repository_test/repository', to: 'repository' },
				{ from: './node_modules/paella-skins/skins/opencast', to: 'skins/opencast' }
			]
		})
	],

	performance: {
		hints: false,
		maxEntrypointSize: 1048576,
		maxAssetSize: 1048576
	}
}