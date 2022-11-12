<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import InputComp from '@/components/Input/Input.vue';
import InputGroup from '@/components/Input/InputGroup.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import { nanoid } from 'nanoid'
import { reactive, ref, computed } from 'vue'
import { delay, formToData, validateForm } from '@/utils'

const boardStore = useBoardStore()
const modalStore = useModalStore()
const showErrors = ref(false)
const isFormValid = computed(() => Object.values(validateForm(boardForm)).every(isValid => isValid))
const editedBoard = computed(() => formToData(boardForm))

const boardForm = reactive({
  title: {
    value: boardStore.activeBoard.title,
    isValid: true
  },

  fields: [
    ...boardStore.activeBoard.fields.map((field) => ({...field, isValid:true}))
  ]
})

const deleteFieldHandler = async (fieldId) => {
  await delay(50)
  const index = boardForm.fields.findIndex(field => field.id === fieldId)
  boardForm.fields.splice(index, 1)
}

const addFieldHandler = () => {
  const field = {
    id: nanoid(),
    name: "",
    color: "bg-indigo-600",
    tasks: [],
    isValid: false
  }
  boardForm.fields.push(field)
}

const validateFormHandler = () => {
  if(isFormValid.value){
    const board = {
      id: boardStore.activeBoard.id,
      ...editedBoard.value
    }
    boardStore.editBoard(board)
    modalStore.closeModal()
    return
  }
  showErrors.value = true
}

const filterByFieldId = (index) => {
  const fields = boardForm.fields.slice(0, index)
  return fields
}
</script>
<template>
  <div class="task-form">
    <InputComp 
      label="Name"
      placeholder="e.g Take coffee break."
      v-model="boardForm.title.value"
      v-model:isValid="boardForm.title.isValid"
      :itemList="boardStore.boardsWithoutActiveBoard"
      :itemKey="(item) => item.title"
      :showError="showErrors"
      required>
    </InputComp>

    <InputGroup label="Columns">
      <InputComp
        v-for="(field, index) in boardForm.fields"
        @delete="deleteFieldHandler(field.id)"
        v-model="field.name" 
        v-model:isValid="field.isValid"
        :itemList="filterByFieldId(index)"
        :itemKey="(item) => item.name"
        :showError="showErrors"
        :deleteButton="field.tasks.length === 0 && boardForm.fields.length > 1"
        required>
      </InputComp>
    </InputGroup>

    <ButtonComp
      @click="addFieldHandler"
      name="+ Add New Column" 
      class="task-form__button task-form__button--add-subtask">
    </ButtonComp>

    <ButtonComp
      @click="validateFormHandler"
      name="Save Changes" 
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