import { defineStore } from "pinia";

export const useModalStore = defineStore("modal", {
  state: () => ({
    isOpen: false
  }),
  
  actions: {
    toggleModal(){
      this.isOpen = !this.isOpen
    }
  },

});
