const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
// Above, are our imports we use to config our dist folder.


// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    // Above, is our entry for creating our PWA
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),

      // Above is our filename and name of folder to be created.
    },
    plugins: [

      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'Webpack Plugin',
        inject: true,
      }),

      // Above, is the html webpack plugin with a template (entry), title and inject set to true.


      new MiniCssExtractPlugin({
        filename: '[name].css', // Output CSS filename
      }),

      // Above, we add our css to be included in our dist folder.


      new WebpackPwaManifest({
        name: 'LOGOs',
        short_name: 'LOGOs',
        description: 'LOGOS for application!',
        background_color: '#7eb4e2',
        theme_color: '#7eb4e2',
        start_url: './',
        publicPath: './',
        icons: [
          {
            src: path.resolve('src/images/logo.png'),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
          },

        

        ],

      }),

      // Above, is our manifest plugin that we will be adding to our build.



    
      new WorkboxPlugin.InjectManifest({
        swSrc: path.resolve(__dirname, 'src-sw.js'), // Path to your custom service worker
        swDest: path.resolve(__dirname, 'dist/src-sw.js'), // Path where the generated service worker will be saved
      }),
  
      // Above, we use the inject manifest because we have a pwrsonal file we want to use for caching.
      // This is used instead of GenerateSW when you have a seperate cache file. 

      
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },

        // Above we extract css to seperate files

        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        // Above we make sure that our JS files are compatible with ES6 or a older version of JS.
        // Also, we exclude node moduels and bower compenents from the loader.
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
          generator: {
            filename: 'assets/images/[name][ext]', // Ensure this is correct
          },
        },

        // Above is a rule for images
        // The rule creates a path to the file

        
      ],
    },
  };
};
