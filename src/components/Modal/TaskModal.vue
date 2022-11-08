<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import TaskForm from '@/components/Form/TaskForm.vue';
const props = defineProps(["toggleTaskModal", "isModalOpen"])
</script>
<template>
  <div v-if="props.isModalOpen"
    class="absolute top-0 right-0 left-0 bottom-0 bg-black bg-opacity-60 text-white flex">
    <div class="bg-brand m-auto p-5 w-1/2 flex flex-col gap-4">
      <div class="flex justify-between items-center">
        <h4>Add New Task</h4>
        <ButtonComp @click="props.toggleTaskModal" icon="close" iconClass="text-secondary" btnPadding="px-0"></ButtonComp>
      </div>
      <TaskForm :toggleTaskModal="toggleTaskModal"/>
    </div>
  </div>
</template>