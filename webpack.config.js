const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ProvidePlugin, DefinePlugin } = require('webpack');

module.exports = (env) => {
  return {
    mode: 'development',
    entry: './src/client/index.tsx',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/i,
          use: [
            'style-loader',
            'css-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ],
          exclude: /node_modules/
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'img/[name][ext][query]'
          }
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'fonts/[name][ext][query]'
          }
        }
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      fallback: {
        "os": require.resolve("os-browserify"),
        "https": require.resolve("https-browserify"),
        "http": require.resolve("stream-http"),
        "stream": require.resolve("stream-browserify"),
        "assert": require.resolve("assert/"),
        "crypto": require.resolve("crypto-browserify"),
      }
    },
      plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/client/template.html')
      }),
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        process: 'process/browser',
        Buffer: [ 'safe-buffer', 'Buffer' ]
      }),
      new DefinePlugin({
        __NETWORK__: JSON.stringify(env.NETWORK),
      })
    ],
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'public'),
      clean: true
    }
  }
};
