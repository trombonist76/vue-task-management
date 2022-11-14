<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import * as modals from "@/constants";
import { useMobile } from '@/composables/use-mobile'
import HeaderDropdown from "./HeaderDropdown.vue";

const { isMobile } = useMobile()
const props = defineProps(["openModal", "activeBoardName"])

const openCreateTaskModal = () => {
  props.openModal(modals.CREATE_TASK)
}

const openEditBoardModal = () => {
  props.openModal(modals.EDIT_BOARD)
}

const openDeleteBoardModal = () => {
  props.openModal(modals.DELETE_BOARD, { name: props.activeBoardName })
}
</script>

<template>
  <div class="header__buttons">
    <ButtonComp v-if="isMobile" @click="openCreateTaskModal" class="header__btn" icon="add"></ButtonComp>
    <ButtonComp v-else @click="openCreateTaskModal" class="header__btn" icon="add" name="Add New Task"></ButtonComp>
    <HeaderDropdown 
      @edit="openEditBoardModal"
      @delete="openDeleteBoardModal"
      editName="Edit Board" 
      deleteName="Delete Board">
    </HeaderDropdown>
  </div>
</template>

<style lang="scss" scoped>
.header{

  &__buttons {
    @apply flex ml-auto gap-4 relative
  }

  &__btn{
    @apply bg-primary text-xs lg:text-sm
  }
}
</style>