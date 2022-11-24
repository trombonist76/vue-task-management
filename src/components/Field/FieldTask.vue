<script setup>
import { computed } from 'vue';

  const props = defineProps(["task"])
  const checkAnySubtask = computed(() => props.task.subtasks.length > 0)
  const subtaskTitle = computed(() => {
    if(!checkAnySubtask.value){
      return "No Subtasks"
    }
    return `${props.task.subtasks.filter(task => task.isCompleted).length} of ${props.task.subtasks.length} subtasks`
  })
</script>
<template>
  <div class="task">{{props.task.title}} 
    <br>
    <span class="task__title">{{subtaskTitle}}</span>
  </div>
</template>

<style lang="scss" scoped>
  .task{
    @apply min-h-[5.5rem] flex flex-col justify-center px-4 py-6 bg-light drop-shadow-md dark:bg-brand rounded-lg text-sm hover:opacity-60 transition-opacity;

    &__title{
      @apply text-slate-400 text-xs tracking-wide inline-flex mt-2;
    }
  }
</style>