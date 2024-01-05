<template>
  <div class="login">
    <div class="page-title">
      <h2
        class="title"
        :class="{ active: page == 'login' }"
        @click="page = 'login'"
      >
        Login
      </h2>
      <h2
        class="title"
        :class="{ active: page == 'register' }"
        @click="page = 'register'"
      >
        Register
      </h2>
    </div>
    <div class="login-register-container">
      <el-form
        v-if="page == 'login'"
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="loginForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm(loginFormRef, 'login')"
            >Login</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginByGithub"
            >loginByGithub</el-button
          >
        </el-form-item>
      </el-form>
      <el-form
        v-else
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        label-width="80px"
        class="register-form"
      >
        <el-form-item label="Username" prop="username">
          <el-input v-model="registerForm.username"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="registerForm.password" type="password"></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="submitForm(registerFormRef, 'register')"
            >Register</el-button
          >
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="loginByGithub"
            >loginByGithub</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue";
import { api, GET, POST } from "./common";
import { FormRules, FormInstance, ElMessage } from "element-plus";
import { useRouter } from "vue-router";
const router = useRouter();
const loginFormRef = ref<FormInstance>();
const registerFormRef = ref<FormInstance>();
const page = ref<"login" | "register">("login");
const loginForm = reactive({
  username: "",
  password: "",
});
const loginRules = reactive<FormRules<typeof loginForm>>({
  username: {
    required: true,
    type: "string",
  },
  password: {
    required: true,
    type: "string",
  },
});
const registerForm = reactive({
  username: "",
  password: "",
  confirmPassword: "",
});
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (registerForm.confirmPassword !== "") {
      if (!registerFormRef.value) return;
      registerFormRef.value.validateField("confirmPassword", () => null);
    }
    callback();
  }
};
const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password again"));
  } else if (value !== registerForm.password) {
    callback(new Error("Two inputs don't match!"));
  } else {
    callback();
  }
};
const registerRules = reactive<FormRules<typeof registerForm>>({
  username: {
    required: true,
    type: "string",
  },
  password: [{ validator: validatePass, trigger: "blur" }],
  confirmPassword: [{ validator: validatePass2, trigger: "blur" }],
});

function login() {
  POST(api.login, {
    username: loginForm.username,
    pwd: loginForm.password,
  })
    .then((res) => {
      console.log(res);
      ElMessage.success("登录成功");
      router.push("/token?token=" + res);
    })
    .catch((err) => ElMessage.error(err.message));
}
function register() {
  POST(api.register, {
    username: registerForm.username,
    pwd: registerForm.password,
  })
    .then((res) => {
      console.log(res);
      ElMessage.success("注册成功");
      page.value = "login";
    })
    .catch((err) => ElMessage.error(err.message));
}
function loginByGithub() {
  location.href = api.github_login;
}
const submitForm = (
  formEl: FormInstance | undefined,
  type: "login" | "register"
) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      if (type == "login") {
        login();
      } else {
        register();
      }
      console.log("submit!");
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
</script>

<style scoped lang="scss">
@import "./mixin.scss";
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  .page-title {
    @include flexCenter();
    .title {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 20px;
      opacity: 0.6;
      & + .title {
        margin-left: 50px;
      }
      &.active {
        opacity: 1;
      }
    }
  }
  .login-register-container {
    min-height: 400px;
    .login-form,
    .register-form {
      width: 400px;
      margin: 0 20px;
    }
  }
}
</style>
