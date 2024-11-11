import { Configuration } from "webpack";
import { BuildOptions } from "./types/types";

export function buildResolvers(
  options: BuildOptions
): Configuration["resolve"] {
  return {
    extensions: [".tsx", ".ts", ".js"], // Указание расширений файлов, которые Webpack будет учитывать при импорте
    alias: {
      "@": options.paths.src,
    },
  };
}
