
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = function(env, argv) {
	const devMode = env.development ? true : false;

	return {
		mode: devMode ? 'development' : 'production',
		resolve: {
			extensions: ['.js', '.jsx', '.ts', '.tsx'],
			alias: {
				src: path.resolve(__dirname, 'src'),
				store: path.resolve(__dirname, 'store'),
				public: path.resolve(__dirname, 'public'),
				images: path.resolve(__dirname, 'public/images'),
				constants: path.resolve(__dirname, 'src/constants'),
				components: path.resolve(__dirname, 'src/components'),
				hooks: path.resolve(__dirname, 'src/hooks'),
			}
		},
		entry: {
			app: './index'
		},
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'build'),
		},
		devServer: {
			port: 3031,
			hot: true,
			open: true,
		},
		module: {
			rules: [
				{
					test: /\.tsx?$/,
					use: [
						{ 
							loader: 'ts-loader'
						},
					]
				},
				{
					test: /\.(css|s[ac]ss)$/,
					use: [
						devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
						{
							loader: 'css-loader',
							options: { 
								importLoaders: 1,
								modules: {
									localIdentName: '[hash:base64:5]'
								},
								url: false, 
							} 
						},
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: {
									plugins: [
										['autoprefixer', {}]
									]
								}
							}
						},
						'sass-loader'
					]
				},
				{
					test: /\.(jpe?g|png|gif|svg)$/,
					use: [{
						loader: 'file-loader',
						options: {
							esModule: false
						}
					}]
				}
			]
		},
		plugins: [
			new CleanWebpackPlugin(),
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: './index.html',
			}),
			new MiniCssExtractPlugin({ 
				filename: '[name].css',
				chunkFilename: '[id].css'
			}),
			new CopyWebpackPlugin({
				patterns: [
					{ from: 'public', to: 'public' }
				]
			})
		]
	}
}