const path = require(`path`);

module.exports = {
  entry: `./src/index.tsx`,
  output: {
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devServer: {
    contentBase: path.join(__dirname, `public`),
    open: false,
    inline: false,
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
      }, {
        test: /\.(tsx|ts)$/,
        exclude: /node_modules/,
        loader: `ts-loader`
      }
    ],
  },
  resolve: {
    modules: [`node_modules`, `src`],
    extensions: [`.ts`, `.tsx`, `.js`, `.jsx`, `json`]
  },
  devtool: `source-map`,
};
