const path = require("path")
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    "app": "src/index.js"
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: "/",
    filename: "js/[name].js",
    chunkFilename: "js/[id].js",
  },
  resolve: {
    extensions: [".js", ".jsx", ".vue", ".scss", ".json"],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      'src': path.resolve(__dirname, 'src'),
    },
    modules: [
      path.resolve(__dirname, "src"),
      path.resolve(__dirname, "node_modules")
    ]
  },
  optimization: {
    minimize: false,
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    open: false,
    host: "0.0.0.0",
    historyApiFallback: true,
    overlay: {
      errors: true,
      warnings: false,
    },
    stats: 'errors-only',
    proxy: {}
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        include: path.resolve(__dirname,'src'),
        options: {
          cacheDirectory: true,
        },
      },
     {
        test: /\.s?css$/,
        use: [
          'vue-style-loader' ,
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|svga|apng)$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: 'img/[name].[hash].[ext]',
            }
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'media/[name].[hash].[ext]',
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'font/[name].[hash].[ext]'
        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname,'index.html'),
      inject: true,
    }),
  ]
}