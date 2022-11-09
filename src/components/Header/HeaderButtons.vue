<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import { useMobile } from '@/composables/use-mobile'

const props = defineProps(["openModal"])
const { isMobile } = useMobile()

const openModalHandler = () => {
  props.openModal('TaskModal')
}

</script>

<template>
  <div class="header__buttons">
    <ButtonComp v-if="isMobile" @click="openModalHandler" class="header__btn" icon="add"></ButtonComp>
    <ButtonComp v-else @click="openModalHandler" class="header__btn" icon="add" name="Add New Task"></ButtonComp>
    <ButtonComp icon="more_vert"></ButtonComp>
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