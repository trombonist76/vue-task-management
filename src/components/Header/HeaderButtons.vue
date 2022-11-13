<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import * as modals from "@/constants";
import { useMobile } from '@/composables/use-mobile'
import { useClickOutside } from '@/composables/use-clickOutside'
import { delay } from "@/utils"
import { ref } from "vue";

const { isMobile } = useMobile()
const props = defineProps(["openModal", "activeBoardName"])
const showOptions = ref(false)
const optionsRef = ref(null)

const openCreateTaskModal = () => {
  props.openModal(modals.CREATE_TASK)
}

const openEditBoardModal = () => {
  props.openModal(modals.EDIT_BOARD)
  toggleOptions()
}

const openDeleteBoardModal = () => {
  props.openModal(modals.DELETE_BOARD, { name: props.activeBoardName })
  toggleOptions()
}

const toggleOptions = async () => {
  await delay(50)
  showOptions.value = !showOptions.value
}

useClickOutside(optionsRef, () => {
  if(!showOptions.value) return
  showOptions.value = false
})

</script>

<template>
  <div class="header__buttons">
    <ButtonComp v-if="isMobile" @click="openCreateTaskModal" class="header__btn" icon="add"></ButtonComp>
    <ButtonComp v-else @click="openCreateTaskModal" class="header__btn" icon="add" name="Add New Task"></ButtonComp>
    <ButtonComp @click="toggleOptions" icon="more_vert"></ButtonComp>
    <div v-show="showOptions" ref="optionsRef" class="header__dropdown">
      <ButtonComp @click="openEditBoardModal" name="Edit Board" class="header__dropdown__btn"></ButtonComp>
      <ButtonComp @click="openDeleteBoardModal" name="Delete Board" class="header__dropdown__btn header__dropdown__btn--delete"></ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.header{

  &__buttons {
    @apply flex ml-auto relative
  }

  &__btn{
    @apply bg-primary text-xs lg:text-sm
  }

  &__dropdown{
    @apply bg-brand-dark border border-border rounded-md p-4 absolute top-16 z-10;

    &__btn{
      @apply hover:opacity-60 transition-opacity text-secondary-dark;

      &--delete{
        @apply text-red-400
      }
    }
  }
}
</style>