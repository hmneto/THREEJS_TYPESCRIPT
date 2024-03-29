// const path = require('path')
// module.exports = {
//     entry: path.join(__dirname,'index.js'),
//     output: {
//         filename: 'bundle.js',
//         path: path.resolve(__dirname)
//     }
// }




const path = require('path');

module.exports = {
    entry: path.join(__dirname,'index.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname)
    },
  resolve: {
    extensions: ['.ts', '.js']
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ]
  }
};