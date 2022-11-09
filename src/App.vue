<script setup>
import MainSection from '@/components/Main/MainSection.vue'
import ModalSidebar from '@/components/Modal/ModalSidebar.vue';
import Modal from '@/components/Modal/Modal.vue';
import HeaderPanel from '@/components/Header/Header.vue';
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import { useMobile } from "@/composables/use-mobile"
import { useModalStore } from '@/stores/use-modal';
import { computed } from "vue";

const { isMobile } = useMobile()
const modalStore = useModalStore()
const renderComponent = computed(() => isMobile.value ? ModalSidebar : Sidebar)

const closeModalHandler = () => {
  modalStore.closeModal()
}
</script>

<template>
  <div class="app">
    <HeaderPanel/>
    <div class="app__content">
      <Teleport to="#modal-container" :disabled="!isMobile">
        <component :is="renderComponent"></component>
      </Teleport>
      <MainSection />
    </div>
  </div>

  <Teleport to="#modal-container">
    <Modal :modalComponent="modalStore.activeModal" :isOpen="modalStore.activeModal" @clickedOutside="closeModalHandler"></Modal>
  </Teleport>
</template>

<style lang="scss" scoped>
.app {
  @apply flex flex-col h-full bg-brand text-white;

  &__content {
    @apply flex-1 flex relative
  }
}
</style>

