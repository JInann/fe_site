<template>
  <div class="login">
    <div class="form-item">
      <div class="label">账号：</div>
      <div class="form-ctx">
        <input v-model="form.user" type="text" />
      </div>
    </div>
    <div class="form-item">
      <div class="label">密码：</div>
      <div class="form-ctx">
        <input v-model="form.pwd" type="password" />
      </div>
    </div>
    <div class="btns">
      <div class="btn" @click="loginClick">登录</div>
      <div class="btn" @click="registerClick">注册</div>
      <div class="btn" @click="loginByGithub">github登录</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { api, GET, POST } from "./common";
const form = ref({
  user: "",
  pwd: "",
});
function loginClick() {
  POST(api.login, {
    username: form.value.user,
    pwd: form.value.pwd,
  }).then(console.log);
}
function registerClick() {
  POST(api.register, {
    username: form.value.user,
    pwd: form.value.pwd,
  }).then(console.log);
}
function loginByGithub() {
  location.href = api.github_login;
  // console.log("loginByGithub");
}
</script>

<style lang="scss" scoped>
@import "./mixin.scss";
.login {
  height: 100vh;
}
</style>
