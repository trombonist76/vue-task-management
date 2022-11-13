<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import FormHeader from './FormHeader.vue';

const props = defineProps(["formInfo"])

const boardStore = useBoardStore()
const modalStore = useModalStore()

const deleteBoardHandler = () => {
  boardStore.deleteBoard()
  modalStore.closeModal()
}

const cancelHandler = () => {
  modalStore.closeModal()
}

</script>
<template>
  <div class="form">

    <div class="delete-board__header">
      <FormHeader v-bind="props.formInfo"></FormHeader>
    </div>

    <div class="form__inner delete-board">
      <ButtonComp
      @click="deleteBoardHandler"
      name="Delete" 
      class="delete-board__btn delete-board__btn--delete">
      </ButtonComp>

      <ButtonComp
        @click="cancelHandler"
        name="Cancel" 
        class="delete-board__btn delete-board__btn--cancel">
      </ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.delete-board{
  @apply flex-row;

  &__btn{
    @apply flex-1 justify-center transition-opacity hover:opacity-60;

    &--delete{
      @apply bg-rose-500
    }

    &--cancel{
      @apply text-primary-light bg-white
    }
  }
}
</style>