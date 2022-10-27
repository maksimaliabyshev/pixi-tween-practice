module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	plugins: ["import", "prettier"],
	extends: ["plugin:import/errors", "plugin:import/warnings", "airbnb-base", "plugin:prettier/recommended"],
	overrides: [],
	parserOptions: {
		ecmaVersion: "latest",
		sourceType: "module",
	},
	rules: {
		"no-console": 0,
		"prettier/prettier": "error",
		"import/no-extraneous-dependencies": [
			"error",
			{ devDependencies: ["vite.config.js", "**/*.test.ts", "**/*.test.tsx"] },
		],
		"func-names": ["warn", "as-needed"],
		"no-underscore-dangle": ["error", { allowAfterThis: true }],
	},
	settings: {
		"import/resolver": {
			alias: {
				map: [
					["@assets", "./public/assets"],
					["@helpers", "./src/helpers"],
				],
				extensions: [".js", ".jsx", ".json", "css"],
			},
		},
	},
};
