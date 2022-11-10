<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import InputComp from './Input.vue';
import InputGroup from './InputGroup.vue';
import InputSelect from './InputSelect.vue';
import { nanoid } from 'nanoid'
import { reactive, ref, computed } from 'vue'
import { delay, formToData, validateForm } from '@/utils'

const props = defineProps(["toggleTaskModal"])
const showErrors = ref(false)
const isFormValid = computed(() => Object.values(validateForm(taskForm)).every(isValid => isValid))
const newTask = computed(() => {formToData(taskForm)})
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

const options = ["Todo", "Doing", "Completed"]

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
  console.log('isFormValid.value', isFormValid.value)
  if(isFormValid.value){
    console.log("Form Valid")
    return
  }
  showErrors.value = true
}
</script>
<template>
  <div class="form">
    <InputComp 
      label="Title" 
      v-model="taskForm.title.value"
      v-model:isValid="taskForm.title.isValid"
      :showError="showErrors"
      required>
    </InputComp>

    <InputComp 
      label="Description" 
      inputType="textarea" 
      v-model="taskForm.description.value">
    </InputComp>

    <InputGroup label="Subtasks">
      <InputComp
        @delete="deleteSubtaskHandler(subtask.id)"
        v-for="subtask in taskForm.subtasks"
        v-model="subtask.value" 
        v-model:isValid="subtask.isValid"
        deleteButton 
        :showError="showErrors"
        required>
      </InputComp>
    </InputGroup>

    <ButtonComp
      @click="addSubtaskHandler"
      name="+ Add New Subtask" 
      class="form__button form__button--add-subtask">
    </ButtonComp>

    <InputSelect 
      v-model="taskForm.status.value" 
      :items="options"
      required
      :showError="showErrors">
    </InputSelect>

    <ButtonComp
      @click="validateFormHandler"
      name="Create Task" 
      class="form__button form__button--submit">
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
        @apply bg-primary text-white
      }
    }
  }
</style>