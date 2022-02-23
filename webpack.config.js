const path = require('path');

module.exports = {
    entry: ["regenerator-runtime/runtime.js",
      './client/index.js'
    ],
    output: {
      path: __dirname,
      filename: './public/bundle.js'
    },
    mode: 'development',
    devtool: 'source-map',
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(__dirname, 'client')
          ],
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-react'
            ]
          }
        },

        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ],
        }
      ]

    }
  }