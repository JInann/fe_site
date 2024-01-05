import { createPinia, defineStore } from "pinia";
export default createPinia();
export const useStore = defineStore("store", {
  state: () => {
    return {};
  },
  getters: {},
  actions: {},
});
