module.exports = {
  presets: [
    [
      '@babel/preset-env',

      {
        corejs: {
          proposals: false,
          version: 3,
        },

        modules: false,

        targets: {
          browsers: [
            'last 2 chrome versions',
            'last 2 firefox versions',
            'last 2 edge versions',
            'last 2 ios versions',
            'last 2 opera versions',
            'last 2 safari versions',
            'last 2 ChromeAndroid versions',
          ],
        },

        useBuiltIns: 'usage',
      },
    ],

    '@babel/react',
  ],
}
