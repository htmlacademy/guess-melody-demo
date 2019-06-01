const path = require(`path`);

module.exports = {
  entry: `./src/index.js`,
  output: {
    filename: `index.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    compress: false,
    port: 1337,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: `babel-loader`,
        },
      },
      {
        test: /\.tsx?$/,
        loader: `ts-loader`
      }
    ],
  },
  devtool: `source-map`
};
