/* eslint-disable */

module.exports = {
	outputDir: './dist/',

	css: {
		modules: true,

		loaderOptions: {
			css: {
				localIdentName: '[name]-[hash]',
				camelCase: 'only'
			}
		}
	},

	chainWebpack: config => {

		const svgRule = config.module.rule('svg');

		svgRule.uses.clear();

		svgRule
			.use('vue-svg-loader')
			.loader('vue-svg-loader');

		config.optimization
			.splitChunks(false)

		config.devServer
			.public('http://127.0.0.1:8080')
			.host('127.0.0.1')
			.port(8080)
			.hotOnly(true)
			.watchOptions({
				poll: 1000
			})
			.https(false)
			.headers({
				"Access-Control-Allow-Origin": ["\*"]
			})
	}
}