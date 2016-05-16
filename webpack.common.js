var webpack = require("webpack");
var version = require("./package.json").version;
var banner =
  "/**\n" +
  " * vue-markdown v" + version + "\n" +
  " * https://github.com/miaolz123/vue-markdown\n" +
  " * MIT License\n" +
  " */\n";

module.exports = {
  entry: "./src/VueMarkdown.js",
  target: "node",
  output: {
    path: "./dist",
    filename: "vue-markdown.common.js",
    library: "VueMarkdown",
    libraryTarget: "umd"
  },
  externals: /^[^.]/,
  plugins: [
    new webpack.BannerPlugin(banner, { raw: true })
  ],
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: "vue"
    }, {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: "style!css"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }]
  },
}
