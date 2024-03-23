import path from "node:path";

function getOutPath(folderName) {
  return path.resolve(import.meta.dirname, "dest", folderName);
}

export default () => {
  const baseConfig = {
    mode: "production",
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/i,
          loader: "ts-loader",
          exclude: ["/node_modules/", "/examples/"],
        },
      ],
    },
    resolve: {
      extensions: [".ts"],
    },
  };

  return [
    // Browser UMD bundle
    {
      ...baseConfig,
      entry: "./src/index.browser.ts",
      output: {
        path: getOutPath("browser"),
        filename: "umd.js",
        library: {
          type: "umd",
        },
      },
    },
    // browser ESM bundle
    {
      ...baseConfig,
      entry: "./src/index.browser.ts",
      output: {
        path: getOutPath("browser"),
        filename: "esm.js",
        library: {
          type: "module",
        },
      },
      experiments: {
        outputModule: true,
      },
    },
    // browser CJS bundle
    {
      ...baseConfig,
      entry: "./src/index.browser.ts",
      output: {
        path: getOutPath("browser"),
        filename: "cjs.js",
        library: {
          type: "commonjs2",
        },
      },
    },
    // node CJS bundle
    {
      ...baseConfig,
      target: "node",
      entry: "./src/index.server.ts",
      output: {
        path: getOutPath("node"),
        filename: "cjs.cjs",
        library: {
          type: "commonjs2",
        },
      },
    },
    // node ESM bundle
    {
      ...baseConfig,
      target: "node",
      entry: "./src/index.server.ts",
      experiments: {
        outputModule: true,
      },
      output: {
        path: getOutPath("node"),
        filename: "esm.mjs",
        chunkFormat: "module",
        library: {
          type: "module",
        },
      },
    },
  ];
};
