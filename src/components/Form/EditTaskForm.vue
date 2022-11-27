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
import { saveBoardsLocal } from '@/services/local';

const props = defineProps(["formInfo", "taskTitle"])
const boardStore = useBoardStore()
const modalStore = useModalStore()
const task = computed(() => boardStore.getTask(props.taskTitle))
const taskWithoutCurrentTask = computed(() => boardStore.activeBoardTasks.filter(task => task.title !== props.taskTitle))
const taskField = computed(() => boardStore.getTaskField(props.taskTitle))
const showErrors = ref(false)
const isFormValid = computed(() => Object.values(validateForm(taskForm)).every(isValid => isValid))

const taskForm = reactive({
  title: {
    value: task.value.title,
    isValid: true
  },

  description: {
    value: task.value.description,
    isValid: true
  },

  status: {
    value: taskField.value.name,
    isValid: true
  },

  subtasks: [
    ...task.value.subtasks.map((subtask) => ({...subtask, isValid:true}))
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
    const taskData = formToData(taskForm)
    const editedTask = {
      id: task.value.id,
      ...taskData
    }
    boardStore.editTask(editedTask, props.taskTitle)
    saveBoardsLocal(boardStore.boards)
    modalStore.closeModal()
    return
  }
  showErrors.value = true
}
</script>
<template>
  <div class="form">
    <div class="form__header">
      <FormHeader v-bind="props.formInfo"></FormHeader>
    </div>
    <div class="form__inner">
      {{boardStore.getAllTasks}}
      <InputComp 
        label="Title"
        placeholder="e.g Take coffee break."
        v-model="taskForm.title.value"
        v-model:isValid="taskForm.title.isValid"
        :itemList="taskWithoutCurrentTask"
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
        class="edit-task__button edit-task__button--add-subtask">
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
        name="Save Changes" 
        class="edit-task__button edit-task__button--submit">
      </ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.edit-task{
  @apply bg-brand m-auto p-8 flex flex-col gap-4 w-[30rem] text-white rounded-md;

  &__inner{
    @apply flex flex-col gap-4 font-bold;
  }

  &__button{
    @apply text-sm font-bold w-full justify-center py-2;

    &--add-subtask{
      @apply bg-primary-light/20 dark:bg-light text-primary hover:opacity-90 transition-opacity
    }

    &--submit{
      @apply bg-primary text-white hover:bg-primary-light transition-colors
    }
  }
}

</style>