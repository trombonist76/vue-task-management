<script setup>
import FormHeader from './FormHeader.vue';
import InputSelect from '@/components/Input/InputSelect.vue';
import HeaderDropdown from '@/components/Header/HeaderDropdown.vue';
import InputCheckbox from '@/components/Input/InputCheckbox.vue';
import InputGroup from '@/components/Input/InputGroup.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import { computed } from 'vue';
import * as modals from "@/constants"

const props = defineProps(["taskTitle"])
const boardStore = useBoardStore()
const modalStore = useModalStore()
const task = computed(() => boardStore.getTask(props.taskTitle))
const taskField = computed(() => boardStore.getTaskField(props.taskTitle))
const checkAnySubtasks = computed(() => task.value.subtasks.length > 0)
const description = computed(() => !!task.value.description ? task.value.description : "No description")
const countCompletedSubtasks = computed(() => task.value.subtasks.filter(subtask => subtask.isCompleted).length)
const subtasksLabel = computed(() => `Subtasks (${countCompletedSubtasks.value} of ${task.value.subtasks.length})`)

const statusHandler = (selectedField) => {
  boardStore.changeTaskField(taskField.value.name, selectedField, props.taskTitle)
}

const editHandler = () => {
  modalStore.closeModal()
  modalStore.setActiveModal(modals.EDIT_TASK, { taskTitle: props.taskTitle })
}

const deleteHandler = () => {
  modalStore.closeModal()
  modalStore.setActiveModal(modals.DELETE_TASK, { name: props.taskTitle })

}
</script>

<template>
  <div class="form">
    <div class="form__header">
      <FormHeader :title="task.title" :description="description"></FormHeader>
      <HeaderDropdown
        class="form__header__more"
        editName="Edit Task" 
        deleteName="Delete Task" 
        @edit="editHandler" 
        @delete="deleteHandler">
      </HeaderDropdown>
    </div>
    <div class="form__inner">
      <InputGroup :label="subtasksLabel">
        <InputCheckbox v-if="checkAnySubtasks" v-for="subtask in task.subtasks" :text="subtask.value" v-model="subtask.isCompleted"></InputCheckbox>
        <span v-else class="no-subtasks">No Subtasks</span>
      </InputGroup>
      <InputSelect 
        label="Current Status"
        required
        @update:modelValue="statusHandler" 
        :value="task.status"
        :items="boardStore.activeBoardFields">
      </InputSelect>
    </div>
  </div>
</template>

<style lang="scss" scoped>

.form__header{
  @apply relative flex justify-between items-baseline;

  &__more{
    @apply self-baseline;
  }
}

.form__inner{
  @apply flex flex-col font-bold gap-6;

  .no-subtasks{
    @apply text-xs text-secondary;
  }
}

</style>