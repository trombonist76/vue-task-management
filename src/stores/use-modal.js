import { defineStore } from "pinia";
import { delay } from "@/utils"
import { getModalData } from "../services/modals";
export const useModalStore = defineStore("modal", {
  state: () => ({
    activeModal: {
      name: "",
      title: "",
      description: "",
      type: ""
    }
  }),
  
  actions: {
    async setActiveModal(modal, deletedItemName){
      const { title, description, type } = await getModalData(modal)
      await delay(150)
      
      this.activeModal.name = modal
      this.activeModal.title = title
      this.activeModal.type = type

      if(!description && !deletedItemName) return
      this.activeModal.description = description.replace('{itemName}', deletedItemName)
    },

    closeModal(){
      this.activeModal.name = ""
      this.activeModal.title = ""
      this.activeModal.description = ""
      this.activeModal.type = ""
    }
  },
});
