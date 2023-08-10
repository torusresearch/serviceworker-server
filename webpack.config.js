const webpack = require("webpack");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

const devMode = process.env.NODE_ENV !== "production";

const plugins = [
  new webpack.ProvidePlugin({
    Buffer: ["buffer", "Buffer"],
  }),
  new webpack.ProvidePlugin({
    process: "process/browser.js",
  }),
  new BundleAnalyzerPlugin({
    analyzerMode: "static",
    openAnalyzer: false,
  }),
];

/** @type {import("webpack").Configuration} */
module.exports = {
  mode: process.env.NODE_ENV || "production",
  devtool: devMode ? "source-map" : false,
  entry: "./broadcastChannel.js",
  target: "web",
  output: {
    path: path.resolve(__dirname, "./public"),
    filename: "broadcastChannel.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    alias: {
      "bn.js": path.resolve("./node_modules", "bn.js"),
      "readable-stream": path.resolve("./node_modules", "readable-stream"),
    },
    fallback: {
      http: false,
      https: false,
      os: false,
      crypto: false,
      assert: false,
      stream: false,
      url: false,
      buffer: require.resolve("buffer/"),
      fs: false,
      path: false,
    },
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            targets: ["supports bigint", "not dead"],
          },
        },
      },
    ],
  },
};
