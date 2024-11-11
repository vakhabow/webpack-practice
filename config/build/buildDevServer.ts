import type { Configuration as DevServerConfiguration } from "webpack-dev-server"; // Типизация для конфигурации DevServer
import { BuildOptions } from "./types/types";

export function buildServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port ?? 3000, // Порт для dev-сервера (по умолчанию 3000)
    open: true, // Автоматически открывает браузер при запуске dev-сервера
    historyApiFallback: true,
    hot: true
  };
}
