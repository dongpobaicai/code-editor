const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  // chainWebpack: config => {
  //   config.resolve.alias.set('@', 'src')
  // },
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:8009",
        changeOrigin: true,
        pathRewrite: {
          "/api": "",
        },
      },
    },
  },
});
