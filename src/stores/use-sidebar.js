import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isModalOpen: false,
    isSidebarHiding: false
  }),
  
  actions: {
    toggleModal(){
      this.isModalOpen = !this.isModalOpen
    },

    closeModal(){
      if (!this.isModalOpen) return
      this.isModalOpen = false
    },

    hideSidebar(){
      if (this.isSidebarHiding) return
      this.isSidebarHiding = true
    },

    showSidebar(){
      if (!this.isSidebarHiding) return
      this.isSidebarHiding = false
    }
  },
});
