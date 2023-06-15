import { createPinia, defineStore } from "pinia";
import { api, APP, debounce, GET, JGET } from "./common";
export default createPinia();
export const useStore = defineStore("store", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {},
});
