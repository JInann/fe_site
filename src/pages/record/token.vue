<template>
  <div class="record">
    <!-- <h1>余额</h1> -->
    <div class="yue">{{ token }}</div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { api, GET } from "./common";
import { useRoute } from "vue-router";
const route = useRoute();
const token = ref(route.params.token);
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
