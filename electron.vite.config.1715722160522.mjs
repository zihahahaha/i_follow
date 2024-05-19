// electron.vite.config.ts
import { resolve } from "path";
import { defineConfig, externalizeDepsPlugin } from "electron-vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
var electron_vite_config_default = defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()],
    resolve: {
      alias: {
        "@": resolve("src"),
        "@api": resolve("src/api")
      }
    }
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    // server: {
    //   host: true
    // },
    resolve: {
      alias: {
        "@renderer": resolve("src/renderer/src"),
        "@": resolve("src"),
        "@api": resolve("src/api")
      }
    },
    plugins: [vue(), vueJsx()]
  }
});
export {
  electron_vite_config_default as default
};
