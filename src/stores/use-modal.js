import { defineStore } from "pinia";
import { delay } from "@/utils"
export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: ""
  }),
  
  actions: {
    async setActiveModal(modal){
      await delay(50)
      this.activeModal = modal
    },

    closeModal(){
      console.log("deactive")
      this.activeModal = ""
    }
  },
});
