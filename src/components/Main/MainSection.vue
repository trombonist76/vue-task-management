<script setup>
import HeaderPanel from '../Header/Header.vue';
import TaskModal from '../Modal/TaskModal.vue';
import Field from './Field.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from '@/stores/use-modal';
import { bindColorsToStatus } from "@/utils" 
import { computed } from 'vue';

const boardStore = useBoardStore()
const modalStore = useModalStore()
const colors = ['bg-blue-300','bg-primary','bg-green-300','bg-orange-300', 'bg-blue-500', 'bg-rose-500'].reverse()
const fields = computed(() => bindColorsToStatus(colors, boardStore.activeBoard.tasks))

</script>
<template>
  <div class="flex-1 flex flex-col text-white">
    <HeaderPanel :toggleModal="modalStore.toggleModal"/>
    <main class="flex-1 bg-brand-dark px-7 py-4 flex gap-6">
      <Field v-for="(field,index) in fields" :key="index" :field="field" :activeBoard="boardStore.activeBoard"/>
    </main>
  </div>
  <TaskModal :toggleModal="modalStore.toggleModal" :isModalOpen="modalStore.isOpen"/>
</template>