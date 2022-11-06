import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    isHiding: false
  }),
  
  actions: {
    toggleSidebar(){
      this.isHiding = !this.isHiding
    }
  },

});
