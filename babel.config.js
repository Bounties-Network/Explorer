module.exports = {
  presets: [['@babel/preset-typescript'], ['@babel/preset-react']],
  plugins: [
    ['react-hot-loader/babel'],
    ['@babel/plugin-syntax-object-rest-spread'],
    ['@babel/plugin-proposal-class-properties'],
    ['@babel/plugin-transform-react-jsx'],
    [
      'import',
      {
        libraryName: 'lodash',
        libraryDirectory: 'fp',
        camel2DashComponentName: false
      },
      'lodash'
    ],
    [
      'import',
      {
        libraryName: 'containers',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'containers'
    ],
    [
      'import',
      {
        libraryName: 'hocs',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'hocs'
    ],
    [
      'import',
      {
        libraryName: 'components',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'components'
    ],
    [
      'import',
      {
        libraryName: 'explorer-components',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'explorer'
    ],
    [
      'import',
      {
        libraryName: 'layout',
        libraryDirectory: '',
        camel2DashComponentName: false
      },
      'layout'
    ]
  ]
};
