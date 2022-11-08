<script setup>
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import Modal from '@/components/Modal/Modal.vue';
import { useSidebarStore } from "@/stores/use-sidebar"
  
  const sidebarStore = useSidebarStore()
  const clickedOutsideHandler =  () => {
    sidebarStore.closeModal()
  }
</script>
<template>
  <Modal :isOpen="sidebarStore.isModalOpen" @clickedOutside="clickedOutsideHandler">
    <Sidebar></Sidebar>
  </Modal>
</template>