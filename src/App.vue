<script setup>
import MainSection from '@/components/Main/MainSection.vue'
import HeaderPanel from '@/components/Header/Header.vue';
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import Modal from '@/components/Modal/Modal.vue';
import { useMobile } from "@/composables/use-mobile"
import { useModalStore } from '@/stores/use-modal';
import { useThemeStore } from '@/stores/use-theme';
import { useBoardStore } from '@/stores/use-board';
import { onMounted } from 'vue';

const { isMobile } = useMobile()
const modalStore = useModalStore()
const boardStore = useBoardStore()
const themeStore = useThemeStore()

onMounted(async () => {
  themeStore.setTheme()
  await boardStore.fetchBoards()
})
</script>

<template>
  <div class="app">
    <HeaderPanel/>
    <div class="app__content">
      <Sidebar v-if="!isMobile"></Sidebar>
      <MainSection></MainSection>
    </div>
  </div>
  <Teleport to="body">
    <Transition name="fade">
      <Modal v-if="modalStore.isOpen"></Modal>
    </Transition>
  </Teleport>
</template>

<style lang="scss" scoped>
.app {
  @apply flex flex-col h-full bg-light text-black dark:bg-brand dark:text-white;

  &__content {
    @apply flex-1 flex relative
  }
}
</style>

