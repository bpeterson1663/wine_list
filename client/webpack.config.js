const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: './src/index.tsx',
    module: {
        rules: [
            {
              test: /\.tsx?$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
            }
        ]
    },
    resolve: { extensions: ['.ts', '.tsx', '.js'] },
    output: {
        path: path.resolve(__dirname, 'dist/'),
        publicPath: '/',
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.join(__dirname, '/'),
        compress: true,
        port: 9000,
    },
    plugins: [new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'index.html') })]

}