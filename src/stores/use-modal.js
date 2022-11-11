import { defineStore } from "pinia";
import { delay } from "@/utils"
export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: {
      name: "",
      isForm: false
    }
  }),
  
  actions: {
    async setActiveModal(modal, isForm = true){
      await delay(150)
      if(isForm){
        this.activeModal.isForm = isForm
      }
      this.activeModal.name = modal

    },

    closeModal(){
      this.activeModal.name = ""
      this.activeModal.isForm = false

    }
  },
});
