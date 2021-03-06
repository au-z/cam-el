module.exports = {
  presets: [["@babel/preset-env", {
			corejs: '3.6',
			useBuiltIns: 'usage',
		}],
		"@babel/preset-typescript",
  ]
}