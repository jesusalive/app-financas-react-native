module.exports = {
  plugins: [
    [
      'babel-plugin-root-import',
      {
        rootPathSuffix: 'src',
      },
    ],
  ],
  env: {
    production: {
      plugins: [
        [
          'babel-plugin-root-import',
          {
            rootPathSuffix: 'src',
          },
        ],
      ],
    },
  },
  presets: ['module:metro-react-native-babel-preset'],
};
