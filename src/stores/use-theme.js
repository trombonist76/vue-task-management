import { defineStore } from "pinia";
import { getBoards } from "@/utils";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    isLight: false
  }),
  
  actions: {
    toggleTheme(){
      this.isLight = !this.isLight
    }
  },
});
