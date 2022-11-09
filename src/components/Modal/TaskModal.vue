<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import TaskForm from '@/components/Form/TaskForm.vue';
const props = defineProps(["toggleTaskModal", "isModalOpen"])
</script>
<template>
    <div class="new-task">
      <div class="new-task__header">
        <h4>Add New Task</h4>
        <ButtonComp @click="props.toggleTaskModal" icon="close" iconClass="text-secondary" btnPadding="px-0"></ButtonComp>
      </div>
      <TaskForm :toggleTaskModal="props.toggleTaskModal"/>
    </div>
</template>

<style lang="scss" scoped>
  .new-task{
    @apply bg-brand m-auto p-8 flex flex-col gap-4 w-[30rem] text-white;

    &__header{
      @apply flex justify-between items-center;
    }
  }
</style>