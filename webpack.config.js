const path = require('path');


module.exports = () => {
    const baseConfig = {
        mode: 'production',
        entry: './src/index.ts',
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.(ts|tsx)$/i,
                    loader: 'ts-loader',
                    exclude: ['/node_modules/'],
                },
            ],
        },
        resolve: {
            extensions: ['.ts'],
        },
    }

    return [{
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'cjs.js',
            library: {
                type: "commonjs2"
            },
        },
    }, {
        ...baseConfig,
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'esm.js',
            library: {
                type: "module"
            },
        },
        experiments: {
            outputModule: true
        }
    }]
};
