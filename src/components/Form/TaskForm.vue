<script setup>
import { nanoid } from 'nanoid'
import { reactive, ref } from 'vue'

const props = defineProps(["toggleTaskModal"])

const formClass = {
  label: 'block mb-2 ml-1 text-xs',
  inner: 'px-3 border border-gray-600 rounded-md overflow-hidden',
  input: 'bg-brand py-3 w-full outline-none text-sm resize-none',
  message: 'text-red-500 text-xs ml-1 mt-1'
}

const newTask = reactive({
  title: "",
  title: "",
  status: null
})

const options = ["Todo", "Doing", "Completed"]
const defaultSubtasks = ref(["e.g Make coffee", "e.g Drink coffee & smile"])

const deleteSubtask = (index) => {
  defaultSubtasks.value.splice(index, 1)
  newTask.subtasks.value.splice(index, 1)
}

const addSubtask = () => {
  defaultSubtasks.value.push("e.g Make coffee")
}

const addNewTask = () => {
  const task = {
    id: nanoid(),
    ...newTask
  }
  activeTab.value.tasks.push(task)
  props.toggleTaskModal()
}
</script>
<template>
  <FormKit type="form" :actions="false" @submit="addNewTask" v-model="newTask"
    message-class="text-red-500 text-xs ml-1 mt-4">

    <div class="flex flex-col gap-4">
      <FormKit name="title" validation="required" label="Title" placeholder="e.g Take coffee break" type="text"
        :classes="formClass" />
      <FormKit name="description" label="Description" :classes="formClass"
        placeholder="e.g It's always good to take a break. This 15 minutes break will recharge the batteries a little"
        type="textarea" />

      <FormKit name="subtasks" type="list" :classes="formClass">
        <div v-for="(subtask, index) in defaultSubtasks" class="flex">
          <FormKit type="text" :label="index === 0 && 'Subtasks'" :placeholder="subtask" :classes="formClass"
            outer-class="flex-1" />
          <button @click="deleteSubtask(index)" class="ml-5 text-center">
            <font-awesome-icon icon="fa-solid fa-xmark" />
          </button>
        </div>
      </FormKit>

      <a @click="addSubtask" class="text-center text-sm w-full bg-white text-black py-2 rounded-full font-semibold">+
        Add New Subtask</a>
      <FormKit name="status" validation="required" type="select" label="Status" :classes="formClass"
        placeholder="Task Status" :options="options" />
      <button type="submit" class="text-sm w-full bg-primary text-white py-2 rounded-full font-semibold">Create
        Task</button>
    </div>

  </FormKit>
</template>