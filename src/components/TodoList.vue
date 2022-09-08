<script>
import CreateTodo from './CreateTodo.vue';
import ListSection from './ListSection.vue';
  export default{
    inject: ["title","todos"],
    components: { CreateTodo, ListSection }
}
</script>
<template>
  <div class="w-2/3 m-auto bg-white px-7 py-6 mt-32 border border-gray-300">
    <h3 class="font-bold">{{title}}</h3>
    <CreateTodo/>
    <ListSection/>
  </div>
</template>