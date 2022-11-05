<script setup>
import { useBoardStore } from "@/stores/use-board"
import ButtonComp from "@/components/Button/Button.vue"
const props = defineProps(["toggleModal"])
const boardStore = useBoardStore()

</script>
<template>
  <div class="header">
    <h1 class="header__title" >{{boardStore.activeBoard.title}}</h1>
    <ButtonComp @click="props.toggleModal" class="bg-primary" icon="add" name="Add New Task"></ButtonComp>
  </div>
</template>

<style lang="scss" scoped>
.header{
  @apply bg-brand w-full h-16 px-7 flex items-center text-white justify-between border-b border-gray-700;

  &__title{
    @apply text-lg
  }
}
</style>