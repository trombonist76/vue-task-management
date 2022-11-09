<script setup>
  const props = defineProps(["task"])
</script>
<template>
  <div class="min-h-[5.5rem] flex flex-col justify-center px-4 py-6 bg-brand rounded-lg text-sm" >{{props.task.title}} 
    <br>
    <span class="text-slate-400 text-xs tracking-wide inline-flex mt-2">0 of 3 subatasks</span>
  </div>
</template>