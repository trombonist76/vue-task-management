<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import { useClickOutside } from '@/composables/use-clickOutside'
import { delay } from "@/utils"
import { ref } from "vue";

const emits = defineEmits(["edit", "delete"])
const props = defineProps(["editName", "deleteName"])
const showOptions = ref(false)
const optionsRef = ref(null)

const toggleOptions = async () => {
  await delay(50)
  showOptions.value = !showOptions.value
}

useClickOutside(optionsRef, () => {
  if(!showOptions.value) return
  showOptions.value = false
})

const deleteHandler = () => {
  emits("delete")
  toggleOptions()
}

const editHandler = () => {
  emits("edit")
  toggleOptions()
}
</script>

<template>
  <ButtonComp icon="more_vert" btnPadding="p-0" @click="toggleOptions"></ButtonComp>
  <div v-show="showOptions" ref="optionsRef" class="dropdown">
    <ButtonComp @click="editHandler" :name="props.editName" class="dropdown__btn"></ButtonComp>
    <ButtonComp @click="deleteHandler" :name="props.deleteName" class="dropdown__btn dropdown__btn--delete"></ButtonComp>
  </div>
</template>

<style lang="scss" scoped> 
  .dropdown{
    @apply bg-brand-dark border border-border rounded-md p-4 absolute top-12 right-0 z-10;

    &__btn{
      @apply hover:opacity-60 transition-opacity text-secondary-dark;

      &--delete{
        @apply text-red-400
      }
    }
  }

</style>