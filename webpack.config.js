const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { type } = require('os');

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path:path.resolve(__dirname, "dist"),
      clean:true
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
    ],
    module: {
        rules: [
          {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader'],
          },
          {
            test: /\.(jpe?g|png|gif|svg)$/i, 
            type:"asset/resource"
        }
        ]
      },
  devServer: {
    port: 3000,
  },
};