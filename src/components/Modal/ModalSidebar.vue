<script setup>
import Sidebar from '@/components/Sidebar/Sidebar.vue';
import Modal from '@/components/Modal/Modal.vue';
import { useSidebarModal } from "@/stores/use-modal"
  
  const sidebarModal = useSidebarModal()
  const clickedOutsideHandler =  () => {
    sidebarModal.hide()
  }
</script>
<template>
  <Modal :isOpen="sidebarModal.isOpen" @clickedOutside="clickedOutsideHandler">
    <Sidebar></Sidebar>
  </Modal>
</template>