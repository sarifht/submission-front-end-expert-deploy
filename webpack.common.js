const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { GenerateSW } = require("workbox-webpack-plugin");
const FaviconsWebpackPlugin = require("favicons-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

const plugins = [
  new CleanWebpackPlugin({
    cleanOnceBeforeBuildPatterns: ["**/*", "!images/**", "!images/heros/**"], // Exclude images/heros directory
  }),
  new HtmlWebpackPlugin({
    filename: "index.html",
    template: path.resolve(__dirname, "src/templates/index.html"),
    cache: true, // Enable caching
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: path.resolve(__dirname, "src/public/"),
        to: path.resolve(__dirname, "dist/"),
        globOptions: {
          ignore: ["**/images/**"],
        },
      },
      {
        from: path.resolve(__dirname, "src/public/images/"),
        to: path.resolve(__dirname, "dist/images/"),
      },
      {
        from: path.resolve(__dirname, "src/public/app.webmanifest"),
        to: path.resolve(__dirname, "dist/"),
      },
      {
        from: path.resolve(__dirname, "dist/images/heros/"), // Ensure generated images are copied
        to: path.resolve(__dirname, "dist/images/heros/"),
      },
    ],
  }),
  new FaviconsWebpackPlugin({
    logo: path.resolve(__dirname, "src/public/icons/icon.png"),
    mode: "webapp",
    devMode: "webapp",
    favicons: {
      appName: "Sarif Resto",
      appDescription: "Restoran Sarif",
      developerName: "Sarif",
      developerURL: "https://github.com/sarifht",
      background: "#ffffff",
      theme_color: "#ffffff",
      icons: {
        coast: false,
        yandex: false,
      },
    },
  }),
  new GenerateSW({
    swDest: "sw.js",
    clientsClaim: true,
    skipWaiting: true,
    runtimeCaching: [
      {
        urlPattern: /\.(?:html|css|js)$/,
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "static-assets",
        },
      },
      {
        urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
        handler: "CacheFirst",
        options: {
          cacheName: "image-assets",
          expiration: {
            maxEntries: 30,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
        },
      },
      {
        urlPattern: new RegExp("https://restaurant-api.dicoding.dev/list"),
        handler: "NetworkFirst",
        options: {
          cacheName: "restaurant-api",
          networkTimeoutSeconds: 5,
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60,
          },
        },
      },
      {
        urlPattern: new RegExp("https://restaurant-api.dicoding.dev/images/"),
        handler: "StaleWhileRevalidate",
        options: {
          cacheName: "restaurant-images",
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 30 * 24 * 60 * 60,
          },
          cacheableResponse: {
            statuses: [0, 200],
          },
        },
      },
      {
        urlPattern: new RegExp("https://restaurant-api.dicoding.dev/detail/"),
        handler: "NetworkFirst",
        options: {
          cacheName: "restaurant-detail",
          networkTimeoutSeconds: 5,
          expiration: {
            maxEntries: 25,
            maxAgeSeconds: 7 * 24 * 60 * 60,
          },
        },
      },
    ],
  }),
];

if (process.env.ANALYZE === "true") {
  plugins.push(new BundleAnalyzerPlugin());
}

module.exports = {
  entry: {
    app: path.resolve(__dirname, "src/scripts/index.js"),
  },
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        type: "asset",
        use: [
          {
            loader: ImageMinimizerPlugin.loader,
            options: {
              minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                  plugins: [
                    ["jpegtran", { progressive: true }],
                    ["optipng", { optimizationLevel: 3 }],
                  ],
                },
              },
              generator: [
                {
                  preset: "webp",
                  implementation: ImageMinimizerPlugin.imageminGenerate,
                  options: {
                    plugins: ["imagemin-webp"],
                  },
                },
              ],
            },
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: "all",
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: "~",
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
          name: "vendors",
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        styles: {
          name: "styles",
          test: /\.css$/,
          chunks: "all",
          enforce: true,
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        parallel: true, // Enable parallel processing
      }),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ["jpegtran", { progressive: true }],
              ["optipng", { optimizationLevel: 3 }],
            ],
          },
        },
        generator: [
          {
            preset: "webp",
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ["imagemin-webp"],
            },
          },
        ],
      }),
    ],
  },
  plugins: plugins,
};
