<script>
import Task from './Task.vue';
  export default {
    props: ["field"],
    inject: ["activeTab"],
    computed: {
        getTasks() {
            return this.activeTab.value.tasks.filter(t => t.status === this.field.name);
        }
    },
    components: { Task }
}
</script>
<template>
  <div class="flex-1" >
    <div class="tracking-widest text-slate-500 text-xs mb-7">
      <span :class="field.color" class="w-3 h-3 rounded-full inline-flex mr-2"></span>
      {{field.name.toUpperCase()}} ({{getTasks.length}})
    </div>
    <div class="flex flex-col gap-4">
      <Task v-for="(task,index) in getTasks" :key="index" :task="task"/>
    </div>
  </div>
</template>