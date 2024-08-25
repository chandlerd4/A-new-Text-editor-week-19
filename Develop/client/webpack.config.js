const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => ({
  mode: 'development',
  entry: {
    main: './src/js/index.js',
    install: './src/js/install.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    // Simplifies creation of HTML files to serve your bundles
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Just Another Text Editor',
    }),
    // Injects a service worker into your Webpack bundle
    new InjectManifest({
      swSrc: './src-sw.js',
      swDest: 'src-sw.js',
    }),
    // Generates a web app manifest file
    new WebpackPwaManifest({
      fingerprints: false,
      inject: true,
      name: 'Just Another Text Editor',
      short_name: 'J.A.T.E.',
      description: 'A text editor application that functions offline.',
      background_color: '#31a9e1',
      theme_color: '#31a9e1',
      start_url: '/',
      publicPath: '/',
      icons: [
        {
          src: path.resolve('src/images/logo.png'),
          sizes: [96, 128, 192, 256, 384, 512],
          destination: path.join('assets', 'icons'),
        },
      ],
    }),
  ],
  module: {
    rules: [
      // CSS loader
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      // Babel loader for JS files
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [
              '@babel/plugin-proposal-object-rest-spread',
              '@babel/transform-runtime',
            ],
          },
        },
      },
    ],
  },
});
