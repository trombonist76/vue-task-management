<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import HeaderLogo from "@/components/Header/HeaderLogo.vue"
import HeaderButtons from "@/components/Header/HeaderButtons.vue"
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import { useThemeStore } from "@/stores/use-theme"
import { useMobile } from '@/composables/use-mobile'
import { delay } from "@/utils"
import * as modals from "@/constants";

const props = defineProps(["isSidebarHiding"])
const emits = defineEmits(["update:isSidebarHiding","toggleSidebar"])

const boardStore = useBoardStore()
const modalStore = useModalStore()
const themeStore = useThemeStore()
const { isMobile } = useMobile()

const toggleSidebarHandler = async () => {
  await delay(150)
  modalStore.setActiveModal(modals.SIDEBAR)
}

</script>
<template>
  <div class="header">
    <HeaderLogo :theme="themeStore.theme"></HeaderLogo>
    <div class="header__content">
      <h1 class="header__title">{{ boardStore.activeBoard?.title }}</h1>
      <ButtonComp v-if="isMobile" @click="toggleSidebarHandler" icon="expand_more"></ButtonComp>
      <HeaderButtons :activeBoardName="boardStore.activeBoard?.title" :openModal="modalStore.setActiveModal"></HeaderButtons>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply w-full h-24 flex border-b border-light-hover dark:border-gray-700;

  &__content{
    @apply flex flex-1 items-center px-4 md:px-6 lg:px-8;
  }

  &__title {
    @apply font-bold text-sm md:text-lg lg:text-xl xl:text-2xl;
  }
}
</style>