<script>
import { nanoid } from 'nanoid'
export default {
  inject: ["newTask","removeSubtask","activeTab","toggleTaskModal"],
  data() {
    return {
      class: {
        label: 'block mb-2 ml-1 text-xs',
        inner: 'px-3 border border-gray-600 rounded-md overflow-hidden',
        input: 'bg-brand py-3 w-full outline-none text-sm resize-none',
        message: 'text-red-500 text-xs ml-1 mt-1'
      },
      options: ["Todo", "Doing", "Completed"],
      defaultSubtask : ["e.g Make coffee","e.g Drink coffee & smile"]
    }
  },
  methods:{
    deleteSubtask: function(index){
      this.defaultSubtask.splice(index,1)
      this.newTask.value.subtasks.splice(index,1)
    },
    addSubtask: function(){
      this.defaultSubtask.push("e.g Make coffee")
    },
    addNewTask:function(){
      const task = {
        id:nanoid(),
        ...this.newTask.value
      }
      this.activeTab.value.tasks.push(task)
      this.toggleTaskModal()
    }
    
  }
}
</script>
<template>
  <FormKit type="form" :actions="false" @submit="addNewTask" v-model="newTask.value" message-class="text-red-500 text-xs ml-1 mt-4">

      <div class="flex flex-col gap-4"  >
        <FormKit name="title" validation="required" label="Title" placeholder="e.g Take coffee break" type="text" :classes="class" />
        <FormKit name="description" label="Description" :classes="class"
          placeholder="e.g It's always good to take a break. This 15 minutes break will recharge the batteries a little"
          type="textarea" />

        <FormKit name="subtasks" type="list" :classes="class">
          <div v-for="(subtask,index) in defaultSubtask" class="flex">
            <FormKit 
              type="text"
              :label="index === 0 && 'Subtasks'" 
              :placeholder="subtask" 
              :classes="class" 
              outer-class="flex-1"/>
            <button @click="deleteSubtask(index)" class="ml-5 text-center"><font-awesome-icon icon="fa-solid fa-xmark" /></button>
          </div>

        </FormKit>

        <a @click="addSubtask" class="text-center text-sm w-full bg-white text-black py-2 rounded-full font-semibold">+ Add New Subtask</a>
        <FormKit name="status" validation="required" type="select" label="Status" :classes="class" placeholder="Task Status" :options="options" />
        <button type="submit" class="text-sm w-full bg-primary text-white py-2 rounded-full font-semibold">Create Task</button>
      </div>

    </FormKit>
</template>