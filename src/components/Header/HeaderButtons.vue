<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import { useMobile } from '@/composables/use-mobile'
import * as modals from "@/constants";

const props = defineProps(["openModal"])
const { isMobile } = useMobile()

const openCreateTaskModal = () => {
  props.openModal(modals.CREATE_TASK)
}

const openEditBoardModal = () => {
  props.openModal(modals.EDIT_BOARD)
}

</script>

<template>
  <div class="header__buttons">
    <ButtonComp v-if="isMobile" @click="openCreateTaskModal" class="header__btn" icon="add"></ButtonComp>
    <ButtonComp v-else @click="openCreateTaskModal" class="header__btn" icon="add" name="Add New Task"></ButtonComp>
    <ButtonComp @click="openEditBoardModal" icon="more_vert"></ButtonComp>
  </div>
</template>

<style lang="scss" scoped>
.header{

  &__buttons {
    @apply flex ml-auto
  }

  &__btn{
    @apply bg-primary text-xs lg:text-sm
  }
}
</style>