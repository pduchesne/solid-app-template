const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
var webpack = require('webpack');

var path = require('path');

// this will create index.html file containing script
// source in dist folder dynamically
const htmlPlugin = new HtmlWebPackPlugin({
    filename: './index.html',
    inject: 'body'
});

const APP_NAME = "testapp";

var styleLoader = 'style-loader';
var cssLoader = 'css-loader';

module.exports = (env, argv) => {

    return {
        //specify the entry point for your project
        entry: {[APP_NAME]: ['./src/testapp.tsx']},
        // specify the output file name
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'index.js',
            publicPath: '/',
            libraryTarget: 'umd',
            umdNamedDefine: true

        },
        resolve: {
            // this is required to be able to do non relative imports of src code
            // BUT this causes webpack to fail to find hoisted modules higher in the path tree
            //modules: [path.resolve('./src'), path.resolve('./node_modules')],

            // Add `.ts` and `.tsx` as a resolvable extension.
            extensions: ['.ts', '.tsx', '.js'],
            fallback: {
                "url": false,
                //"stream": require.resolve("stream-browserify"),
                //"crypto": require.resolve("crypto-browserify"),
                //stream: require.resolve('readable-stream'),
            },
            alias: {
                // these are necessary to allow yarn linking of local packages
                // cf https://github.com/facebook/react/issues/14257
                react: path.resolve(__dirname, 'node_modules/react'),
                'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
            },
            symlinks: true
        },
        target: 'web',
        devtool: 'source-map',
        module: {
            // consists the transform configuration
            rules: [
                {
                    test: /\.tsx?$/,
                    exclude: /node_modules/,
                    loader: 'ts-loader'
                },
                {
                    test: /\.css$/,
                    use: [styleLoader, cssLoader]
                },

                {
                    test: /\.scss$/,
                    use: [styleLoader, cssLoader, 'sass-loader']
                },
                // { test: /\.json$/, loader: "json-loader" },
                { // required for font-awesome
                    test: /\.(jpe?g|png|gif|svg|ico|woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: "file-loader",
                    options: {
                        outputPath: 'assets/',
                        name: '[name].[ext]'
                    }
                },
            ]
        },
        // this will create a development server to host our application
        // and will also provide live reload functionality
        devServer: {
            host: '0.0.0.0',
            compress: true,
            port: 8000,
            // needed to properly support BrowsrRouter
            // see https://stackoverflow.com/questions/43209666/react-router-v4-cannot-get-url
            historyApiFallback: true,
            https: true
        },

        // this will watch the bundle for any changes
        watch: true,
        // specify the plugins which you are using
        plugins: [
            htmlPlugin
        ]
    }
};
