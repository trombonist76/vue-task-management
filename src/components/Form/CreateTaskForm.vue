<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import FormHeader from './FormHeader.vue';
import InputComp from '@/components/Input/Input.vue';
import InputGroup from '@/components/Input/InputGroup.vue';
import InputSelect from '@/components/Input/InputSelect.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import { nanoid } from 'nanoid'
import { reactive, ref, computed } from 'vue'
import { delay } from '@/utils'
import { formToData, validateForm } from '@/utils/forms'
import { saveBoardsLocal } from "@/services/local";

const props = defineProps(["formInfo"])
const boardStore = useBoardStore()
const modalStore = useModalStore()
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
    saveBoardsLocal(boardStore.boards)
    modalStore.closeModal()
    return
  }
  showErrors.value = true
}
</script>
<template>
  <div class="create-task form">
    <div class="create-task__header">
      <FormHeader v-bind="props.formInfo"></FormHeader>
    </div>
    <div class="create-task__inner form__inner">
      <InputComp 
        label="Title"
        placeholder="e.g Take coffee break."
        v-model="taskForm.title.value"
        v-model:isValid="taskForm.title.isValid"
        :itemList="boardStore.activeBoardTasks"
        :itemKey="(item) => item.title"
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
        class="create-task__button create-task__button--add-subtask">
      </ButtonComp>

      <InputSelect 
        label="Status"
        required
        v-model="taskForm.status.value" 
        v-model:isValid="taskForm.status.isValid"
        :items="boardStore.activeBoardFields"
        :showError="showErrors">
      </InputSelect>

      <ButtonComp
        @click="validateFormHandler"
        name="Create Task" 
        class="create-task__button create-task__button--submit">
      </ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-task{

  &__button{
    @apply text-sm font-bold w-full justify-center py-2;

    &--add-subtask{
      @apply bg-primary/10 dark:bg-light text-primary hover:opacity-90 transition-opacity
    }

    &--submit{
      @apply bg-primary text-white hover:bg-primary-light transition-colors
    }
  }
}

</style>