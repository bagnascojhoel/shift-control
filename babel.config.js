module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@global-styles': './src/global-styles.ts',
            '@model': './src/model/',
            '@components': './src/ui/components/',
            '@utils': './src/utils/',
            '@errors': './src/errors/',
          },
        },
      ],
    ],
  };
};
