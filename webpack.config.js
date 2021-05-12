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
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: resolve('src/client/template.html')
      }),
      new ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new DefinePlugin({
        'process.env.NETWORK': JSON.stringify(env.NETWORK)
      })
    ],
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'public'),
      clean: true
    }
  }
};
