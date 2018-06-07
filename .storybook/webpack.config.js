const path = require("path");
const fs = require('fs');
const autoprefixer = require('autoprefixer');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = (baseConfig, env, defaultConfig) => {
  // Extend defaultConfig as you need.

  // For example, add typescript loader:
  defaultConfig.resolve.modules.push('node_modules')
  defaultConfig.resolve.modules.push('src');
  defaultConfig.module.rules.push({
	  test: /\.module\.scss$/,
	  use: [
	    require.resolve("style-loader"),
	    {
	      loader: "css-loader",
	      options: {
	        "modules": true,
	        "localIdentName": "[local]--[hash:base64:5]",
	      },
	    },
	    require.resolve("sass-loader"),
	    {
	      loader: require.resolve('postcss-loader'),
	      options: {
	        // Necessary for external CSS imports to work
	        // https://github.com/facebookincubator/create-react-app/issues/2677
	        ident: 'postcss',
	        plugins: () => [
	          require('postcss-flexbugs-fixes'),
	          autoprefixer({
	            browsers: [
	              '>1%',
	              'last 4 versions',
	              'Firefox ESR',
	              'not ie < 9', // React doesn't support IE8 anyway
	            ],
	            flexbox: 'no-2009',
	          }),
	        ],
	      },
	    },
	  ],
	});

  defaultConfig.module.rules.push({
	  test: /\.scss$/,
	  use: [
	    require.resolve("style-loader"),
	    {
	      loader: "css-loader",
	      options: {
	        "modules": false,
	        "localIdentName": "[local]--[hash:base64:5]",
	      },
	    },
	    require.resolve("sass-loader"),
	    {
	      loader: require.resolve('postcss-loader'),
	      options: {
	        // Necessary for external CSS imports to work
	        // https://github.com/facebookincubator/create-react-app/issues/2677
	        ident: 'postcss',
	        plugins: () => [
	          require('postcss-flexbugs-fixes'),
	          autoprefixer({
	            browsers: [
	              '>1%',
	              'last 4 versions',
	              'Firefox ESR',
	              'not ie < 9', // React doesn't support IE8 anyway
	            ],
	            flexbox: 'no-2009',
	          }),
	        ],
	      },
	    },
	  ],
	  include: [resolveApp('src/styles')],
	});

  return defaultConfig;
};
