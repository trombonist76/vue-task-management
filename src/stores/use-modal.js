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
      const modalData = await getModalData(modal)
      const formInfo = modalData?.formInfo
      
      await delay(150)
      this.isOpen = true
      this.name = modal
      this.formData = formData
      this.formInfo = formInfo

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
