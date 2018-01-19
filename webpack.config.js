module.exports = {
	entry: "./src/index.js",
	output: {
		filename: "./output/bundle.js"
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				loader: "babel-loader",
				query:{
					presets: [
						"es2015",
						"react"
					]
				}
			}
		]
	},
	devServer: {
		inline: true,
		port: 8080,
		open: true
	}
}
