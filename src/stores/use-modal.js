import { defineStore } from "pinia";

export const useSidebarModal = defineStore("sidebarModal", {
  state: () => ({
    isOpen: false
  }),
  
  actions: {
    toggle(){
      this.isOpen = !this.isOpen
    },

    hide(){
      if (!this.isOpen) return
      this.isOpen = false
    }
  },
});
