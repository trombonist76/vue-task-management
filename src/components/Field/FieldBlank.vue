<script setup>
import { useModalStore } from '@/stores/use-modal';
import * as modals from "@/constants"

const modalStore = useModalStore()

const addColumnHandler = () => {
  modalStore.setActiveModal(modals.EDIT_BOARD, { isNameDisabled: true })
}
</script>

<template>
  <div class="new-field" @click="addColumnHandler">
    + New Column
  </div>  
</template>

<style lang="scss" scoped>
  .new-field{
    @apply w-[17.5rem] flex-shrink-0 flex items-center justify-center
    bg-opacity-20 text-secondary hover:text-primary transition-all
    text-2xl font-bold bg-gradient-to-b rounded-md 
    from-secondary/20 to-transparent cursor-pointer mt-11
  }
</style>