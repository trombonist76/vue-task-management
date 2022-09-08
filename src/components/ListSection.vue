<script>
  export default{
    inject:["deleteTodo","todos"],
     methods: {
      toggleActive: function(todo){
        const todoItem = this.todos.find(t=> t === todo)
        todoItem.isActive = !todoItem.isActive
      },
    },
    computed:{  
      isCompleted:function(todo){
        return {"line-through":todo.isActive}
      }
    }
  }
</script>
<template>
  <div class="mt-4">
    <ul class="flex flex-col gap-1">
      <li  v-for="(todo,index) in todos" :key="index" class="flex justify-between py-2 border-b border-gray-100">
        <div class="flex gap-2 items-center">
          <label for="check"></label>
          <input id="check" type="checkbox" @click="toggleActive(todo)" class="w-5 h-4 accent-indigo-600 caret-black text-white outline-none">
          <span :class="{'line-through':!todo.isActive}">{{todo.description}}</span>  
        </div>
        <button class="bg-slate-500 p-2 rounded text-white" @click="deleteTodo(index)">Delete</button>
      </li>
    </ul>
  </div>
</template>