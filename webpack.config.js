const path = require('path');

module.exports = () => {
    return {
        mode: 'production',
        entry: './src/index.ts',
        devtool: 'source-map',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            libraryTarget: 'commonjs2'
        },
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
};
