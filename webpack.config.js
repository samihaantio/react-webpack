const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const paths = {
  root: path.resolve(__dirname),
  source: path.resolve(__dirname + "/src"),
  modules: path.resolve(__dirname + "/node_modules"),
  build: path.resolve(__dirname + "/dist"),
}

module.exports = (env = {}) => {
  const isDevelopmentBuild = env.dev;
  return {
    mode: 'development',
    // mode: isDevelopmentBuild ? 'development' : 'production',
    entry: path.resolve(__dirname, './src/index.tsx'),
    devtool: 'cheap-module-source-map',
    // devtool: isDevelopmentBuild ? 'cheap-module-source-map' : 'source-map',
    output: {
      filename: 'main.js',
      path: paths.build,
      publicPath: '/'
    },
    devServer: {
      static: './dist',
      historyApiFallback: true,
      hot: true,
      port: 8081,
    },
    module: {
      rules: [
        {
          test: /\.(ts|js)x?$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
          type: 'asset/resource',
        }
      ]
    },
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".jsx"],
      modules: [paths.source, paths.modules],
      plugins: [new TsconfigPathsPlugin({ 
        configFile: 'tsconfig.json',
        extensions: [".ts", ".tsx", ".js", ".jsx"] 
      })]
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Development',
        template: path.resolve(__dirname, './src/index.html'),
      })
  ],
  }
};
