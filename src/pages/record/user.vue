<template>
  <div class="user">
    <el-descriptions title="userinfo" direction="vertical" :column="1" border>
      <el-descriptions-item v-for="(v, k) in UInfo" :key="k" :label="k">{{
        v
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { api, POST } from "./common";
let UInfo = ref({});
POST(api.userinfo).then((res) => {
  UInfo.value = res;
});
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.user {
  height: 100vh;
  @include flexCenter();
  .el-descriptions {
    width: 100%;
  }
}
</style>
