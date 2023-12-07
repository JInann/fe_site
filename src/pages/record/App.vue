<template>
  <div ref="app" class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "./mixin.scss";
.app {
  height: 100vh;
  width: 7.5rem;
  overflow: scroll;
  background-color: #f0f2f6;
  overflow-x: hidden;
  margin: 0 auto;
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
  margin: 0;
  padding: 0;
}
</style>
