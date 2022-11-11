const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')


const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  entry: isProduction ? "./src/canvas.ts" : {
    index: "./src/index.ts",
    canvas: "./src/canvas.ts"
  },
  output: isProduction ? {
    path: path.resolve(__dirname, "dist"),
    filename: "Canvas.js",
    library: "Canvas",// 在全局变量中增加一个library变量
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
        exclude: [path.resolve(__dirname, "node_modules")]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: "asset",
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb的图片会被base64处理
          },
        },
        generator: {
          //输出图片名称 :10代表取前十位hash值
          filename: 'static/images/[hash:10][ext][query]'
        }
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
    runtimeChunk: 'single'
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