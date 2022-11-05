<script setup>
import { computed } from 'vue';
import Task from './Task.vue';

const props = defineProps(["field", "activeBoard"])
const getTasksByField = computed(() => props.activeBoard.tasks.filter(task => task.status === props.field.name))

</script>
<template>
  <div class="flex-1" >
    <div class="tracking-widest text-slate-500 text-xs mb-7">
      <span :class="field.color" class="w-3 h-3 rounded-full inline-flex mr-2"></span>
      {{props.field.name.toUpperCase()}} ({{getTasksByField.length}})
    </div>
    <div class="flex flex-col gap-4">
      <Task v-for="(task,index) in getTasksByField" :key="index" :task="task"/>
    </div>
  </div>
</template>