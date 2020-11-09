const loaders = (options = {}) => [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      importLoaders: 1,
      ...options,
    },
  },
  { loader: 'postcss-loader' },
];

module.exports = {
  stories: [
    '../stories/**/*.@(tsx|mdx)',
  ],
  webpackFinal: async (config) => ({
    ...config,
    module: {
      ...config.module,
      rules: config.module.rules.reduce(
        (acc, cur) => [
          ...acc,
          ...cur.test.toString() === /\.css$/.toString()
            ? [
              { test: /\.module\.css$/, use: loaders({ modules: true }) },
              { test: /^.*(?<!\.module)\.css$/, use: loaders() },
            ]
            : [cur],
        ],
        [],
      ),
    },
  }),
};
