import { ModuleOptions, runtime } from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import loader from "mini-css-extract-plugin/types/loader";
import { before } from "node:test";
import ReactRefreshTypescript from "react-refresh-typescript";
import { buildBabelLoader } from "./babel/buildBabelLoader";

export function buildLoaders(options: BuildOptions): ModuleOptions["rules"] {
  const isDev = options.mode === "development"; // Определение режима разработки на основе переданного `env`

  const assetLoader = {
    test: /\.(png|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  };

  const svgrLoader = {
    test: /\.svg$/i,
    issuer: /\.[jt]sx?$/,
    use: [
      {
        loader: "@svgr/webpack",
        options: {
          icon: true,
          svgoConfig: {
            plugins: [
              {
                name: "convertColors",
                params: {
                  currentColor: true,
                },
              },
            ],
          },
        },
      },
    ],
  };

  const cssLoaderWithModules = {
    loader: "css-loader",
    options: {
      modules: {
        localIdentName: isDev ? "[path][name]__[local]" : "[hash:base64:8]",
      },
    },
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      // Creates `style` nodes from JS strings
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,
      // Translates CSS into CommonJS
      cssLoaderWithModules,
      // Compiles Sass to CSS
      "sass-loader",
    ],
  };

  const tsLoader = {
    exclude: "/node_modules/", // Исключение папки `node_modules` из обработки
    test: /\.tsx?$/, // Проверка на файлы с расширением `.ts` или `.tsx`
    use: [
      // Использование ts-loader для компиляции TypeScript
      {
        loader: "ts-loader",
        options: {
          transpileOnly: true,
          getCustomTransformers: () => {
            before: [isDev && ReactRefreshTypescript].filter(Boolean);
          },
        },
      },
    ],
  };

  const babelLoader = buildBabelLoader(options);

  return [
    assetLoader,
    scssLoader,
    // tsLoader,
    svgrLoader,
    babelLoader,
  ];
}
