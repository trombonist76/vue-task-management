<script setup>
import MainSection from '@/components/Main/MainSection.vue'
import HeaderPanel from '@/components/Header/Header.vue';
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import Modal from '@/components/Modal/Modal.vue';
import { useMobile } from "@/composables/use-mobile"
import { useModalStore } from '@/stores/use-modal';
import { useSidebarStore } from '@/stores/use-sidebar';
import { useBoardStore } from '@/stores/use-board';
import { computed, onMounted } from "vue";
import * as modals from './constants'

const { isMobile } = useMobile()
const modalStore = useModalStore()
const sidebarStore = useSidebarStore()
const boardStore = useBoardStore()
const renderComponent = computed(() => isMobile.value ? Modal : Sidebar)

const closeModalHandler = () => {
  //You can move to Modal.vue
  modalStore.closeModal()
}

onMounted(() => boardStore.fetchBoards())
</script>

<template>
  <div class="app">
    <HeaderPanel/>
    <div class="app__content">
      <Teleport to="#modal-container" :disabled="!isMobile">
        <component
          :modalComponent="modals.SIDEBAR"
          :is="renderComponent"
          :isOpen="sidebarStore.isModalOpen"
          @clickedOutside="sidebarStore.closeModal">
        </component>
      </Teleport>
      <MainSection />
    </div>
  </div>
  <Teleport to="#modal-container">
    <Modal
      v-if="!!modalStore.activeModal.name"
      :title="modalStore.activeModal.title"
      :modalComponent="modals.FORM"
      :formComponent="modalStore.activeModal.name"
      :isOpen="!!modalStore.activeModal.name"
      @clickedOutside="closeModalHandler"
      >
    </Modal>
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

