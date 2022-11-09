<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import { nanoid } from 'nanoid'
import { reactive, ref } from 'vue'
import InputComp from './Input.vue';
import InputGroup from './InputGroup.vue';

const props = defineProps(["toggleTaskModal"])

const newTask = reactive({
  title: {
    value: "",
    isValid: false
  },

  description: {
    value: "",
    isValid: true
  },

  subtasks: [
    {
      value: "",
      isValid: false
    },
    {
      value: "",
      isValid: false
    }
  ]
})

const options = ["Todo", "Doing", "Completed"]
const defaultSubtasks = ref(["e.g Make coffee", "e.g Drink coffee & smile"])

const deleteSubtask = (index) => {
  defaultSubtasks.value.splice(index, 1)
  newTask.subtasks.splice(index, 1)
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
  <div class="form">
    <InputComp 
      label="Title" 
      v-model="newTask.title.value" 
      v-model:isValid="newTask.title.isValid" >
    </InputComp>

    <InputComp 
      label="Description" 
      inputType="textarea" 
      v-model="newTask.description.value">
    </InputComp>

    <InputGroup label="Subtasks">
      <InputComp 
        v-for="subtask in newTask.subtasks"
        v-model="subtask.value" 
        v-model:isValid="subtask.isValid"
        deleteButton >
      </InputComp>
    </InputGroup>

    <ButtonComp 
      name="+ Add New Subtask" 
      class="form__button form__button--add-subtask">
    </ButtonComp>
  </div>
</template>

<style lang="scss" scoped>
  .form{
    @apply flex flex-col gap-4 font-bold;

    &__button{
      @apply text-sm font-bold w-full justify-center;

      &--add-subtask{
        @apply bg-white text-primary
      }

      &--submit{
        @apply text-primary bg-white
      }
    }
  }
</style>