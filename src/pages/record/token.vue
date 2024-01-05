<template>
  <div class="record">
    <!-- <h1>余额</h1> -->
    <div class="yue">{{ token }}</div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getQueryString } from "./common";
import { useRoute } from "vue-router";
const route = useRoute();
const token = ref(
  getQueryString("token") || (route.query.token as string) || ""
);
if (token.value) {
  sessionStorage.setItem("token", token.value);
  location.replace(location.origin + "/#/user");
}
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.record {
  height: 100vh;
}
.yue {
  height: 100vh;
}
</style>
