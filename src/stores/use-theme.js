import { defineStore } from "pinia";
import { saveThemeLocal, getThemeLocal } from "@/services/local";

export const useThemeStore = defineStore("theme", {
  state: () => ({
    theme: getThemeLocal() || "light",
  }),
  
  actions: {
    toggleTheme(){
      this.theme = this.theme === "dark" ? "light" : "dark"
      saveThemeLocal(this.theme)
      
      if (this.theme === 'dark'){ 
        document.documentElement.classList.add('dark')
        return
      }

      document.documentElement.classList.remove('dark') 
    }
  },
});
