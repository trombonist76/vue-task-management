import { defineStore } from "pinia";
import { delay } from "@/utils"
import { getModalData } from "../services/modals";
export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: {
      name: "",
      isForm: false,
      title:"",
      description:""
    }
  }),
  
  actions: {
    async setActiveModal(modal, isForm = true){
      const { title, description } = await getModalData(modal)
      await delay(150)

      if(isForm){
        this.activeModal.isForm = isForm
      }
      
      this.activeModal.name = modal
      this.activeModal.title = title
      this.activeModal.description = description
    },

    closeModal(){
      this.activeModal.name = ""
      this.activeModal.isForm = false

    }
  },
});
