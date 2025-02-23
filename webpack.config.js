const path = require('path');

module.exports = {
  // Entry point for your application
  entry: './src/index.js', // Change this to the correct entry point if needed
  
  // Output settings
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js', // Output file
  },

  // Module rules for loaders
  module: {
    rules: [
      {
        // Babel loader for JavaScript files
        test: /\.js$/, // Apply Babel on .js files
        exclude: /node_modules/, // Don't process files in node_modules
        use: {
          loader: 'babel-loader',
          options: {
            // Babel options (Presets and plugins)
            presets: ['@babel/preset-env'], // This is for supporting modern JavaScript
            plugins: [
              '@babel/plugin-proposal-class-properties', // Enables class properties (required by Chart.js)
            ],
          },
        },
      },
    ],
  },

  // Resolve file extensions so Webpack knows how to handle them
  resolve: {
    extensions: ['.js', '.jsx', '.json'],
  },

  // Source map for debugging
  devtool: 'source-map',

  // Optional: Define mode (development or production)
  mode: 'development', // Change to 'production' when ready to build for production
};
