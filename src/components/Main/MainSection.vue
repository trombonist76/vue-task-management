<script setup>
import TaskModal from '../Modal/TaskModal.vue';
import Field from './Field.vue';
import { useBoardStore } from "@/stores/use-board"
import { useSidebarStore } from "@/stores/use-sidebar"
import { useMobile } from "@/composables/use-mobile"
import { bindColorsToStatus } from "@/utils" 
import { computed } from 'vue';

const boardStore = useBoardStore()
const sidebarStore = useSidebarStore()
const { isMobile } = useMobile()
// const modalStore = useModalStore()
const widthClass = computed(() => ({
  "fields--full": sidebarStore.isSidebarHiding || isMobile.value,
}))
const colors = ['bg-blue-300','bg-primary','bg-green-300','bg-orange-300', 'bg-blue-500', 'bg-rose-500'].reverse()
const fields = computed(() => bindColorsToStatus(colors, boardStore.activeBoard.tasks))

</script>
<template>
  <main class="fields" :class="widthClass">
    <ul class="flex-1 bg-brand-dark px-7 py-4 flex gap-6">
      <Field v-for="(field,index) in fields" :key="index" :field="field" :activeBoard="boardStore.activeBoard"/>
    </ul>
  </main>
  <!-- <TaskModal :toggleModal="modalStore.toggleModal" :isModalOpen="modalStore.isOpen"/> -->
</template>

<style lang="scss" scoped>
  .fields{
    @apply absolute -z-0 inset-0 left-[300px] flex-1 flex flex-col transition-all duration-500;
    
    &--full{
      @apply left-0
    }
  }  
</style>