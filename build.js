const { execSync } = require("child_process");
let entry = process.env.VITE_ENTRY || "";
let pages;
if (entry) {
  pages = entry.split(",");
} else {
  pages = getChangePageName();
  if (pages.length == 0) {
    console.log("本次提交没有修改页面相关代码");
    return;
  }
}
function getChangePageName() {
  let raw = execSync("git diff --name-only HEAD~1").toString();
  let pages = [];
  raw = raw.replace(/\n/g, "");
  let reg = /src\/pages\/(.+?)\//g;
  var page;
  while ((page = reg.exec(raw))) {
    pages.push(page[1]);
  }

  return [...new Set(pages)];
}
console.log("本次要打包页面:", pages);
pages.forEach((page) => {
  console.log("开始打包：" + page);
  try {
    execSync(
      "npx cross-env VITE_ENTRY=" +
        page +
        " vite build" +
        (process.argv[2] ? " --mode " + process.argv[2] : "")
    );
    console.log("打包完成：" + page);
  } catch (error) {
    console.log(error.message);
    console.log("打包失败：" + page);
  }
});
