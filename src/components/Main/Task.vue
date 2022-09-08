<script>
  export default{
    props:["task"]
  }
</script>
<template>
  <div class="px-3 py-3 bg-brand rounded-lg text-sm" >{{task.title}} 
    <br>
    <span class="text-slate-400 text-xs tracking-wide inline-flex mt-2">0 of 3 subatasks</span>
  </div>
</template>