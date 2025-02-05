/* eslint-disable import/no-extraneous-dependencies */
import react from "@vitejs/plugin-react"
import path from "path"
import eslint from "vite-plugin-eslint"
import mkcert from "vite-plugin-mkcert"
import svgr from "vite-plugin-svgr"
import tsconfigPaths from "vite-tsconfig-paths"

import { defineConfig, loadEnv } from "vite"

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return defineConfig({
    build: {
      outDir: path.resolve(__dirname, "dist"),
      rollupOptions: {
        input: path.resolve(__dirname, "index.html"),
      },
    },
    assetsInclude: ["**/*.svg", "**/*.png", "**/*.wav"],
    plugins: [
      svgr({
        svgrOptions: {
          ref: true
        }
      }),
      eslint({
        failOnWarning: false,
        failOnError: false
      }),
      react({
        include: "**/*.{jsx,tsx}"
      }),
      tsconfigPaths(),
      mkcert() // if testing against a http localhost backend, remove
    ],
    server: {
      port: 3000,
      host: true,
      hmr: {
        overlay: false
      }
    }
  })
}
