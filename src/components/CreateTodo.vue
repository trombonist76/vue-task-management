<script>
  export default{
    inject:["todos"],
    data(){
      return {
        todoText:""
      }
    },
    methods:{
      addNewTodo:function(){
        const newTodo = {
          description: this.todoText,
          isActive: true,
          createdAt: Date.now()
        }
        this.todos.push(newTodo)
        this.todoText = ""
      }
    }
  }
</script>
<template>
  <div class="flex gap-4 mt-6">
    <input type="text" class="flex-1 outline-none border border-gray-300 p-3 rounded" placeholder="What do you need to do today?" v-model="todoText">
    <button :disabled="!todoText.trim()" @click="addNewTodo" class="bg-indigo-600 hover:bg-indigo-700 transition-colors delay-75 text-white px-5 outline-none disabled:bg-red-600 rounded-md">Add</button>
  </div>

</template>