<script setup>
import { computed, ref } from 'vue';

const props = defineProps({"text": String, "modelValue": { type: Boolean, default: false }})
const emits = defineEmits(["update:modelValue"])

const isChecked = ref(props.modelValue)

const checkHandler = (event) => {
  isChecked.value = event.target.checked
  emits("update:modelValue", isChecked.value)
}

const checkedClass = computed(() => ({
  "checked": isChecked.value
}))
</script>

<template>
  <div class="checkbox">
    <label class="checkbox__label">
      <input :checked="isChecked" @input="checkHandler" type="checkbox" class="checkbox__input" />
      <span :class="checkedClass">{{props.text}}</span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.checkbox{

  &__label{
    @apply flex items-center gap-4 font-bold tracking-wide cursor-pointer
  text-secondary bg-light-ghost hover:bg-primary/25 transition-colors dark:bg-brand-dark p-3 rounded-lg text-xs;

    .checked{
      @apply line-through
    }
  }

  &__input{
      @apply appearance-none relative flex items-center bg-white dark:bg-inherit
      justify-center text-white w-4 h-4 border border-secondary/25 flex-shrink-0;


    &:checked{
      @apply bg-primary border-opacity-0;

      &::before{
        transform: scale(1);
      }
    }

    &::before{
        content: '\002714';
        transform: scale(0);
        transition: all 200ms ease-in-out;
    }
  }
}
</style>