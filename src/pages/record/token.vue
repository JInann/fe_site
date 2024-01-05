<template>
  <div class="record">
    <!-- <div class="yue">{{ token }}</div> -->
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { getQueryString } from "./common";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
const token = ref(
  getQueryString("token") || (route.query.token as string) || ""
);
if (token.value) {
  sessionStorage.setItem("token", token.value);
  router.replace("/user");
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
