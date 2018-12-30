import HtmlWebpackPlugin, { Config } from "html-webpack-plugin";
import { resolve } from "path";
import { Configuration } from "webpack";
const HtmlWebpackIncludeAssetsPlugin = require("html-webpack-include-assets-plugin"); // no types

function config(env: {
  NODE_ENV: "production" | "development";
}): Configuration {
  const production = env.NODE_ENV === "production";
  const assets = production
    ? [
        "https://unpkg.com/react@16/umd/react.production.min.js",
        "https://unpkg.com/react-dom@16/umd/react-dom.production.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
        "https://code.jquery.com/jquery-3.3.1.slim.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
      ]
    : [
        "node_modules/react/umd/react.development.js",
        "node_modules/react-dom/umd/react-dom.development.js",
        "node_modules/bootstrap/dist/css/bootstrap.css",
        "node_modules/jquery/dist/jquery.js",
        "node_modules/bootstrap/dist/js/bootstrap.bundle.js"
      ];
  const htmlWebpackPlugin = new HtmlWebpackPlugin({
    title: "Spontaeo",
    template: resolve(__dirname, "src/index.html")
  });
  const htmlIncludeAssetsPlugin = new HtmlWebpackIncludeAssetsPlugin({
    assets,
    append: false
  });
  const config: Configuration = {
    entry: resolve(__dirname, "src/index.tsx"),
    output: {
      filename: "bundle.js",
      path: resolve(__dirname, "dist")
    },
    mode: production ? "production" : "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM"
    },
    plugins: [htmlWebpackPlugin, htmlIncludeAssetsPlugin]
  };
  if (!production) {
    config.devtool = "inline-source-map";
  }
  return config;
}
export = config;
