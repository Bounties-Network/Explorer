const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = ({ config }) => {
  const getClientEnvironment = require('../config/env')
  const env = getClientEnvironment('/');
  config.plugins.push(new webpack.DefinePlugin(env.stringified))
  console.log(env.stringified)
  config.resolve.modules = ['node_modules', path.resolve(__dirname, '../src')];
  config.resolve.extensions.push('.ts', '.tsx');

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/source-loader')],
    enforce: 'pre'
  });
  config.module.rules.push({
    test: /\.stories\.(ts|tsx)$/,
    exclude: /node_modules/,
    use: [{ loader: require.resolve('@storybook/source-loader'), options: { parser: 'typescript' } }],
    enforce: 'pre'
  });

  config.module.rules.push({
    test: /\.(ts|tsx)$/,
    include: resolveApp('src'),
    loader: require.resolve('babel-loader'),
    options: {
      cacheDirectory: true
    }
  });

  config.module.rules.push({
    test: /\.module\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: true,
          localIdentName: '[local]--[hash:base64:5]'
        }
      },
      'sass-loader',
      {
        loader: 'postcss-loader',
        options: {
          // Necessary for external CSS imports to work
          // https://github.com/facebookincubator/create-react-app/issues/2677
          ident: 'postcss',
          plugins: () => [
            autoprefixer({
              browsers: [
                '>1%',
                'last 4 versions',
                'Firefox ESR',
                'not ie < 9' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ]
  });

  config.module.rules.push({
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          modules: false,
          localIdentName: '[local]--[hash:base64:5]'
        }
      },
      'sass-loader',
      {
        loader: 'postcss-loader',
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
                'not ie < 9' // React doesn't support IE8 anyway
              ],
              flexbox: 'no-2009'
            })
          ]
        }
      }
    ],
    include: [resolveApp('src/styles')]
  });

  return config;
};
