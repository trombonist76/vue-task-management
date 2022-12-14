<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import InputComp from '@/components/Input/Input.vue';
import InputColor from '@/components/Input/InputColor.vue';
import InputGroup from '@/components/Input/InputGroup.vue';
import FormHeader from './FormHeader.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import { nanoid } from 'nanoid'
import { reactive, ref, computed } from 'vue'
import { delay } from '@/utils'
import { formToData, validateForm } from "@/utils/forms"
import { saveBoardsLocal } from "@/services/local";
import { MAX_ADD_OPTION } from '@/constants';

const props = defineProps(["formInfo"])

const boardStore = useBoardStore()
const modalStore = useModalStore()
const showErrors = ref(false)
const isFormValid = computed(() => Object.values(validateForm(boardForm)).every(isValid => isValid))
const checkAddStatus = computed(() => MAX_ADD_OPTION > boardForm.fields.length)
const placeholders = ["e.g. Todo", "e.g. Doing", "e.g. Done", "Column Name"]

const boardForm = reactive({
  title: {
    value: "",
    isValid: false
  },

  fields: [
    {  
      id: nanoid(),
      name: "",
      color: "",
      tasks: [],
      isValid: false
    }
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
    color: "#ffffff",
    tasks: [],
    isValid: false
  }
  boardForm.fields.push(field)
}

const validateFormHandler = () => {
  if(isFormValid.value){
    const board = formToData(boardForm)
    const newBoard = {
      id: nanoid(),
      ...board
    }
    boardStore.createBoard(newBoard)
    saveBoardsLocal(boardStore.boards)
    modalStore.closeModal()
    return
  }
  showErrors.value = true
}

const filterByFieldId = (index) => {
  const fields = boardForm.fields.slice(0, index)
  return fields
}

const getPlaceholder = (index) => {
  const placeholderIndex = index < 3 ? index : 3
  return placeholders.at(placeholderIndex) 
}
</script>
<template>
  <div class="form">
    <div class="form__header">
      <FormHeader v-bind="props.formInfo"></FormHeader>
    </div>
    <div class="create-board form__inner">
      <InputComp 
        label="Name"
        placeholder="e.g Web Design"
        v-model="boardForm.title.value"
        v-model:isValid="boardForm.title.isValid"
        :disabled="props.isNameDisabled"
        :itemList="boardStore.boardsWithoutActiveBoard"
        :itemKey="(item) => item.title"
        :showError="showErrors"
        required>
      </InputComp>

      <InputGroup label="Columns">
        <div class="create-board__field" v-for="(field, index) in boardForm.fields">
          <InputComp
            class="create-board__field__title"
            v-model="field.name" 
            v-model:isValid="field.isValid"
            @delete="deleteFieldHandler(field.id)"
            :placeholder="getPlaceholder(index)"
            :itemList="filterByFieldId(index)"
            :itemKey="(item) => item.name"
            :showError="showErrors"
            :deleteButton="field.tasks.length === 0 && boardForm.fields.length > 1"
            required>
          </InputComp>
          <InputColor v-model="field.color"></InputColor>
        </div>
      </InputGroup>

      <ButtonComp
        v-show="checkAddStatus"
        @click="addFieldHandler"
        name="+ Add New Column" 
        class="create-board__button create-board__button--add-field">
      </ButtonComp>

      <ButtonComp
        @click="validateFormHandler"
        name="Create New Board" 
        class="create-board__button create-board__button--submit">
      </ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.create-board{

  &__button{
    @apply text-sm font-bold w-full justify-center py-2;

    &--add-field{
      @apply bg-primary/10 dark:bg-light text-primary hover:opacity-90 transition-opacity
    }

    &--submit{
      @apply bg-primary text-white hover:bg-primary-light transition-colors
    }
  }

  .create-board__field{
    @apply flex gap-2 items-center;

    &__title{
      @apply flex-1
    }
  }
}  

</style>