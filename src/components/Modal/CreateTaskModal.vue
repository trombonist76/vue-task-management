<script setup>
import TaskForm from '@/components/Form/TaskForm.vue';
</script>
<template>
    <div class="new-task">
      <div class="new-task__header">
        <h4>Add New Task</h4>
      </div>
      <TaskForm/>
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