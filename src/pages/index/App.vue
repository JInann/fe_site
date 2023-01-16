<template>
  <div class="page">
    <div class="user-list">
      <div
        v-for="user in userList"
        :key="user.id"
        :class="{ active: currentUser == user }"
        class="user-item"
        @click="currentUser = user"
      >
        {{ user.id }}
      </div>
    </div>
    <div class="todo-list">
      <div v-for="item in todoList" :key="item.id" class="todo-item">
        <div class="status" @click="changeStatusClick(item)">
          {{ item.status == "done" ? "✅" : "🕗" }}
        </div>
        {{ item.text }}
      </div>
    </div>
    <div class="input">
      <input v-model="addTxt" type="text" />
      <div class="ok-btn" @click="okBtnClick">添加</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { GET, api } from "./common";
const userList = ref([{ id: "001" }, { id: "002" }, { id: "003" }]);
const currentUser = ref(userList.value[0]);

type TodoList = {
  id: string;
  uid: string;
  text: string;
  status: "done" | "doing";
}[];
const todoList = ref<TodoList>([]);
const changeStatusClick = (item: TodoList[0]) => {
  GET(
    api.update +
      "?id=" +
      item.id +
      "&status=" +
      (item.status == "doing" ? "done" : "doing")
  ).then(() => {
    updateTodoList();
  });
  item.status = item.status == "doing" ? "done" : "doing";
};
const updateTodoList = () =>
  GET(api.list + "?uid=" + currentUser.value.id).then((res) => {
    todoList.value = res;
  });
watch(
  currentUser,
  () => {
    updateTodoList();
  },
  { immediate: true }
);

const addTxt = ref("");
const okBtnClick = () => {
  if (addTxt.value != "") {
    GET(
      api.add + "?uid=" + currentUser.value.id + "&text=" + addTxt.value
    ).then(() => {
      addTxt.value = "";
      updateTodoList();
    });
  }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  line-height: 1;
}
</style>
<style lang="scss" scoped>
@import "./mixin.scss";
.page {
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  padding-top: 100px;
  @include flexCenter();
  flex-direction: column;
  .user-list {
    @include flexCenter();
    justify-content: space-around;
    width: 100%;
    .user-item {
      user-select: none;
      &.active {
        font-weight: bold;
      }
    }
  }
  .todo-list {
    @include flexCenter();
    flex-direction: column;
    align-items: flex-start;
    margin-top: 20px;
    width: 300px;
    .todo-item {
      @include flexCenter();
      justify-content: flex-start;
      font-size: 30px;
      height: 50px;
      width: 100%;
      border: 1px solid #ccc;
      padding-left: 20px;
      & + .todo-item {
        margin-top: 10px;
      }
      .status {
        margin-right: 5px;
      }
    }
  }
  .input {
    width: 300px;
    height: 50px;
    border: 1px solid #ccc;
    margin-top: 10px;
    @include flexCenter();
    input {
      flex: 1;
      height: 100%;
      border: none !important;
      outline: none !important;
      padding-left: 20px;
      font-size: 20px;
    }
    .ok-btn {
      height: 100%;
      width: 100px;
      @include flexCenter();
      border-left: 1px solid #ccc;
    }
  }
}
</style>
