const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: isProduction ? "./src/LDay.ts" : {
    index: "./src/index.ts",
    LDay: "./src/LDay.ts"
  },
  output: isProduction ? {
    path: path.resolve(__dirname, "dist"),
    filename: "LDay.js",
    library: "LDay",// 在全局变量中增加一个library变量
    libraryTarget: "umd",
    libraryExport: 'default',
    clean: true,
  } : {
    path: undefined,
    filename: "[name].[contenthash].js",//打包后的文件名称
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/i,
        loader: "ts-loader",
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.cjs', '.json'] //配置文件引入时省略后缀名
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    runtimeChunk: isProduction ? undefined : 'single'
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 模板
      template: path.resolve(__dirname, "./public/index.html")
    }),
  ],
  devtool: isProduction ? "source-map" : "cheap-module-source-map",
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  mode: isProduction ? 'production' : 'development'
}