import { defineStore } from "pinia";
import { delay, createDescription } from "@/utils"
import { getModalData } from "../services/modals";
export const useModalStore = defineStore("modal", {
  state: () => ({
    name: "",
    isForm: false,
    isOpen: false,
    formInfo: {},
    formData: {}
  }),
  
  actions: {
    async setActiveModal(modal, formData){
      const { formInfo } = await getModalData(modal)
      await delay(150)
      this.isOpen = true
      this.name = modal
      this.formInfo = formInfo
      this.formData = formData

      if(formInfo.description){
        this.formInfo.description = createDescription(formInfo.description, formData.name)
      }
    },

    closeModal(){
      this.isOpen = false
      this.name = ""
      this.formInfo = {}
      this.formData = {}
    }
  },
});
