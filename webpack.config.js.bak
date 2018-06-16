const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const fs = require('fs');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

// if a .env file is available env vars will be loaded from it
// otherwise env vars should be presenent in the actual enviroment
require('dotenv').config();


module.exports = {
  entry: {
    recker: ['babel-polyfill', './src/recker/main.js'],
    rehub: './src/rehub/main.js', 
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // note we are only using babel here to transpile 
            // react stuff, assumpiton is development will use a 
            // modern browser with ES2015 features 
            presets: ['react']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader' ]
      },
      {
        test: /\.csm$/,
        use: [
          'style-loader', 
          {
            loader: 'css-loader', 
            options: {
              modules: true, 
              localIdentName: '[name]-[local]-[hash:base64:5]', 
            }
          }
        ]
      }
    ]
  },
  plugins: [
    //new BundleAnalyzerPlugin(),
    new HtmlWebpackPlugin({
      filename: 'recker/index.html',
      template: './src/recker/index.html',
      inject: false, //'body',
      chunks: ['recker'],
      // push NODE_ENV into the plugin context for the template to use
      NODE_ENV: process.env.NODE_ENV,
    }),
    new HtmlWebpackPlugin({
      filename: 'rehub/index.html',
      template: './src/rehub/index.html',
      inject: false, //'body',
      chunks: ['rehub'],
      // push NODE_ENV into the plugin context for the template to use
      NODE_ENV: process.env.NODE_ENV,
    }),
    new CopyWebpackPlugin([{from: 'src/static/css', to: 'css'}]),
    new CopyWebpackPlugin([{from: 'src/static/img', to: 'img'}]),
    new CopyWebpackPlugin([{from: 'src/static/fonts', to: 'fonts'}]),
    new CopyWebpackPlugin([{from: 'src/static/js', to: 'js'}]),
    new CopyWebpackPlugin([{from: 'src/static/index.html', to: 'index.html'}]),
  ],
  resolve: {
    alias: {
      components: path.resolve(__dirname, 'src/recker/components/'),
      modules: path.resolve(__dirname, 'src/common/'),
    },
    extensions: ['*', '.js', '.json', '.jsx']
  },
  devtool: 'inline-source-map',
  devServer: { 
    historyApiFallback: {
      rewrites: [
        { from: /^\/rehub/, to: '/rehub/index.html' },
        { from: /^\/recker/, to: '/recker/index.html' },
      ]
    }, 
    before(app) {
      app.get('/config.json', (req, res) => {
        res.json({
          RECKER_URI:  process.env.RECKER_URI,
          OAUTH_CLIENT_ID: process.env.OAUTH_CLIENT_ID,
          API_KEY:  process.env.API_KEY,
          API_SECRET: process.env.API_SECRET,
          METRICS_PORTAL_PROD_URL:process.env.METRICS_PORTAL_PROD_URL,
          METRICS_PORTAL_STAGE_URL : process.env.METRICS_PORTAL_STAGE_URL,
          MOCK_API_BOOL: process.env.MOCK_API_BOOL
        }); 
      });

      app.get('/', (req, res) => {
        res.redirect('/rehub');
      });
      if (process.env.MOCK_API_IS_ON) require('./mock-api.js')(app); 
    },
  }
}

if (process.env.NODE_ENV === 'production') {
  // the first module rule needs to be the babel loader for
  // this to work, it changes the babel presets to transpile to ES5 
  module.exports.module.rules[0].use.options.presets = ["env", "react"];
  //module.exports.entry = ['babel-polyfill', './src/main.js']; 
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    // define Production in the build to keep rect-dev tooling from building
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    }),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
  ]);

  module.exports.module.rules = (module.exports.module.rules || []).concat([

  ]);
};


