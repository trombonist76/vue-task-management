<script>
  export default {
    inject:["activeTab","toggleTaskModal"]
  }
</script>
<template>
  <div class="bg-brand w-full h-16 px-7 flex items-center text-white justify-between border-b border-gray-700">
    <h1 class="text-lg" >{{activeTab.value.title}}</h1>
    <button @click="toggleTaskModal" class="text-sm rounded-full bg-primary px-4 py-2">+Add New Task</button>
  </div>
</template>