<template>
  <div ref="app" class="app">
    <router-view></router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "./mixin.scss";
.app {
  height: 100vh;
  overflow: scroll;
  background-color: #f0f2f6;
  width: 100vw;
  overflow-x: hidden;
}
</style>
