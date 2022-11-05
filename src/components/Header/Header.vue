<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import HeaderLogo from "@/components/Header/HeaderLogo.vue"
import HeaderButtons from "@/components/Header/HeaderButtons.vue"
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from '@/stores/use-modal'

const boardStore = useBoardStore()
const modalStore = useModalStore()

</script>
<template>
  <div class="header">
    <HeaderLogo></HeaderLogo>
    <div class="header__content">
      <h1 class="header__title">{{ boardStore.activeBoard.title }}</h1>
      <ButtonComp icon="expand_more"></ButtonComp>
      <HeaderButtons :toggleModal="modalStore.toggleModal"></HeaderButtons>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header {
  @apply w-full h-24 flex border-b border-gray-700;

  &__content{
    @apply flex flex-1 items-center px-4 md:px-6 lg:px-8;
  }

  &__title {
    @apply font-bold text-sm md:text-lg lg:text-xl xl:text-2xl;
  }
}
</style>