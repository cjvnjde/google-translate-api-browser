const path = require('node:path');


module.exports = () => {
  const baseConfig = {
    mode: 'production',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: 'ts-loader',
          exclude: ['/node_modules/', '/examples/'],
        },
      ],
    },
    resolve: {
      extensions: ['.ts'],
    },
  }

  return [
    // Browser UMD bundle
    {
      ...baseConfig,
      entry: './src/index.browser.ts',
      output: {
        path: path.resolve(__dirname, 'dist', 'browser'),
        filename: 'umd.js',
        library: {
          type: "umd"
        },
      },
    },
    // browser ESM bundle
    {
      ...baseConfig,
      entry: './src/index.browser.ts',
      output: {
        path: path.resolve(__dirname, 'dist', 'browser'),
        filename: 'esm.js',
        library: {
          type: "module"
        },
      },
      experiments: {
        outputModule: true
      }
    },
    // browser CJS bundle
    {
      ...baseConfig,
      entry: './src/index.browser.ts',
      output: {
        path: path.resolve(__dirname, 'dist', 'browser'),
        filename: 'cjs.js',
        library: {
          type: "commonjs2"
        },
      },
    },
    // node CJS bundle
    {
      ...baseConfig,
      target: 'node',
      entry: './src/index.server.ts',
      output: {
        path: path.resolve(__dirname, 'dist', 'node'),
        filename: 'cjs.js',
        library: {
          type: "commonjs2"
        },
      },
    }
  ]
};
