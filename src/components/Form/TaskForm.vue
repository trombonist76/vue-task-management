<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import InputComp from './Input.vue';
import InputGroup from './InputGroup.vue';
import InputSelect from './InputSelect.vue';
import { useBoardStore } from "@/stores/use-board"
import { nanoid } from 'nanoid'
import { reactive, ref, computed } from 'vue'
import { delay, formToData, validateForm } from '@/utils'

const boardStore = useBoardStore()
const showErrors = ref(false)
const isFormValid = computed(() => Object.values(validateForm(taskForm)).every(isValid => isValid))
const newTask = computed(() => formToData(taskForm))
const taskForm = reactive({
  title: {
    value: "",
    isValid: false
  },

  description: {
    value: "",
    isValid: true
  },

  status: {
    value: "",
    isValid: false
  },

  subtasks: [
    {
      id: nanoid(),
      value: "",
      isCompleted: false,
      isValid: false
    },
  ]
})

const deleteSubtaskHandler = async (id) => {
  await delay(50)
  const index = taskForm.subtasks.findIndex(subtask => subtask.id === id)
  taskForm.subtasks.splice(index, 1)
}

const addSubtaskHandler = () => {
  const subtask = {
    id: nanoid(),
    value: "",
    isCompleted: false
  }
  taskForm.subtasks.push(subtask)
}

const validateFormHandler = () => {
  if(isFormValid.value){
    boardStore.addNewTask(newTask.value)
    return
  }
  showErrors.value = true
}
</script>
<template>
  <div class="task-form">
    <InputComp 
      label="Title"
      placeholder="e.g Take coffee break."
      v-model="taskForm.title.value"
      v-model:isValid="taskForm.title.isValid"
      :showError="showErrors"
      required>
    </InputComp>

    <InputComp 
      label="Description"
      placeholder="e.g It's always good to take a break. This 15 minute break will recharge the batteries a litte."
      inputType="textarea" 
      v-model="taskForm.description.value">
    </InputComp>

    <InputGroup label="Subtasks">
      <InputComp
        @delete="deleteSubtaskHandler(subtask.id)"
        v-for="subtask in taskForm.subtasks"
        v-model="subtask.value" 
        v-model:isValid="subtask.isValid"
        :showError="showErrors"
        placeholder="e.g. Make coffee."
        deleteButton 
        required>
      </InputComp>
    </InputGroup>

    <ButtonComp
      @click="addSubtaskHandler"
      name="+ Add New Subtask" 
      class="task-form__button task-form__button--add-subtask">
    </ButtonComp>

    <InputSelect 
      label="Status"
      v-model="taskForm.status.value" 
      v-model:isValid="taskForm.status.isValid"
      :items="boardStore.boardFields"
      required
      :showError="showErrors">
    </InputSelect>

    <ButtonComp
      @click="validateFormHandler"
      name="Create Task" 
      class="task-form__button task-form__button--submit">
    </ButtonComp>
  </div>
</template>

<style lang="scss" scoped>
  .task-form{
    @apply flex flex-col gap-4 font-bold;

    &__button{
      @apply text-sm font-bold w-full justify-center;

      &--add-subtask{
        @apply bg-white text-primary hover:opacity-90 transition-opacity
      }

      &--submit{
        @apply bg-primary text-white hover:bg-primary-light transition-colors
      }
    }
  }
</style>