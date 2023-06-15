<template>
  <div class="input">
    <div>http://HOST/</div>
    <input v-model="filePath" type="text" placeholder="文件路径" />
    <button v-if="downloading" disabled>下载中，请稍后</button>
    <button v-else @click="downloadClick">下载</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import JSZip from "jszip";
const filePath = ref("");
const baseUrl = "http://devtools.1036892522.top/";
const downloading = ref(false);
function downloadClick() {
  downloading.value = true;
  fetch(baseUrl + filePath.value)
    .then((res) => res.json())
    .then((urlarr: string[]) => {
      let zip = new JSZip();
      let names: string[] = [];
      let blobArr = urlarr.map((v) => {
        let url_temp = v.split("/data/")[1];
        names.push(url_temp.split("/")[1]);
        return fetch(baseUrl + "/data/" + url_temp).then((res) => res.blob());
      }); //假设这是要下载的几个文件的promise，返回blob数组。
      return Promise.all(blobArr).then((res) => {
        res.forEach((item, i) => {
          zip.file(names[i], item); //每个文件的文件名、配置项
        });
        console.log("压缩开始");
        // 生成zip文件并下载
        return zip
          .generateAsync({
            type: "blob", //压缩后的压缩包，转成blob形式
          })
          .then((content) => {
            console.log("压缩完毕，下载压缩包开始");
            let eleLink = document.createElement("a");
            eleLink.download = `download.zip`;
            eleLink.href = URL.createObjectURL(content);
            eleLink.click();
            console.log("下载压缩包结束");
          });
      });
    })
    .catch((err) => {
      alert(err.message);
    })
    .finally(() => {
      downloading.value = false;
    });
}
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.input {
  display: flex;
  height: 40px;
  align-items: center;
  font-size: 20px;
  background: #ddd;
  width: fit-content;
  font-family: "Times New Roman", Times, serif;
  padding-left: 4px;
  input {
    background: transparent;
    outline: none !important;
    border: none !important;
    height: 100%;
    background: white;
    font-size: 20px;
    font-family: "Times New Roman", Times, serif;
    width: 400px;
  }
  button {
    height: 100%;
    width: 120px;
  }
}
</style>
<style>
@font-face {
  font-family: num;
  src: url(./font/num.OTF);
}
html,
body {
  background-color: #f0f2f6 !important;
}
.ani {
  pointer-events: none;
}
* {
  line-height: 1;
}
</style>
