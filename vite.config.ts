import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import legacy from "@vitejs/plugin-legacy";
import { readdirSync, statSync } from "fs";
import { createPromptModule } from "inquirer";
import { execSync } from "child_process";
// https://vitejs.dev/config/

function getPagesOrderByMtime() {
  const pagesPath = "./src/pages/";
  const res = readdirSync(pagesPath)
    .filter((v) => v != ".DS_Store")
    .map((v) => ({
      name: v,
      mtime: statSync(
        pagesPath +
          v +
          "/" +
          readdirSync(pagesPath + v).reduce((p, c) => {
            if (
              statSync(pagesPath + v + "/" + c).mtime.valueOf() >
              statSync(pagesPath + v + "/" + p).mtime.valueOf()
            ) {
              p = c;
            }
            return p;
          })
      ).mtime.valueOf(),
    }));
  res.sort((a, b) => {
    return b.mtime - a.mtime;
  });
  return res.map((v) => v.name);
}
function getChangePageName() {
  const raw = execSync("git diff --name-only HEAD~1").toString();
  const page = /src\/pages\/(.+?)\//.exec(raw);
  return page[1];
}

export default defineConfig(async ({ mode }) => {
  // // 入口获取逻辑
  // try {
  //   readFileSync(".env.local");
  // } catch (error) {
  //   // 创建默认入口
  //   writeFileSync(".env.local", "VITE_ENTRY=index");
  // }
  // 加载环境变量,只有`VITE_`开头的变量可以访问到
  let { VITE_ENTRY } = loadEnv(mode, ".");
  if (!VITE_ENTRY) {
    if (mode == "development") {
      const prompt = createPromptModule();
      const { entry } = await prompt([
        {
          type: "list",
          name: "entry",
          message: "请选择要运行的页面：",
          choices: getPagesOrderByMtime(),
          // when(answer) {
          //   return !answer.confirm_page;
          // },
        },
      ]);
      VITE_ENTRY = entry;
    } else {
      VITE_ENTRY = getChangePageName();
    }
  }
  console.log("打包/运行的页面为:", VITE_ENTRY);
  return {
    // 根据入口文件改变根目录
    root: resolve(__dirname, "src/pages/" + VITE_ENTRY + "/"),
    base: "./",
    publicDir: resolve(__dirname, "public"),
    server: {
      // 自动打开浏览器
      open: "/index.html",
    },
    assetsInclude: ["**/*.svga"],
    envDir: resolve(__dirname),
    plugins: [
      vue(),
      // 兼容插件
      legacy({
        targets: ["defaults", "iOS >= 10"],
      }),
    ],
    build: {
      target: "es2015",
      rollupOptions: {
        // 动态入口
        input: {
          main: resolve(
            __dirname,
            "src/pages/" + VITE_ENTRY + "/",
            "index.html"
          ),
        },
      },
      outDir: resolve(__dirname, mode == "pre" ? "pre" : "dist/", VITE_ENTRY),
      emptyOutDir: true,
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              },
            },
          },
        ],
      },
    },
  };
});
