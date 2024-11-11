import path from "path"; // Импорт модуля Node.js для работы с файловыми путями
import webpack from "webpack"; // Импорт Webpack для доступа к типам и плагинам
import { buildServer } from "./buildDevServer";
import { buildLoaders } from "./buildLoaders";
import { buildPlugins } from "./buldPlugins";
import { buildResolvers } from "./buildResolvers";
import { BuildOptions } from "./types/types";

export function buildWebpack(options: BuildOptions): webpack.Configuration {
  const { mode, paths } = options;

  const isDev = mode === "development";

  return {
    mode: mode ?? "development", // Устанавливаем режим сборки (по умолчанию — "development")
    entry: paths.entry, // Главный файл приложения для сборки
    output: {
      path: paths.output, // Папка для выходных файлов
      filename: "[name].[contenthash].js", // Имя выходных файлов с добавлением уникального хэша (для кеширования)
      clean: true, // Очищает папку `build` перед каждой сборкой
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    devtool: isDev ? "inline-source-map" : false, // Включение source map для удобства отладки в режиме разработки
    devServer: isDev ? buildServer(options) : undefined, // Если не режим разработки, devServer не требуется
  };
}
