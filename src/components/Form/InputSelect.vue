<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import { useClickOutside } from '@/composables/use-clickOutside';
import { onMounted, ref, computed } from 'vue';

const props = defineProps({
  showError: Boolean,
  defaultValue: { type: [String, Object, Number] },
  items: { type: Array, required: true },
  valueKey: { type: Function, default(item){ return item }},
  errorMessages: { type: Object, default: { used: "Used", required: "Required" }}
})

const emits = defineEmits(["update:modelValue","isValid"])
const selected = ref(props.defaultValue || null)
const dropdownRef = ref(null)
const isOptionsHiding = ref(true)
const errorMessage = computed(() => !selected.value && "Required")

const errorClass = computed(() => ({
  "dropdown__selected--error": props.showError && errorMessage.value
}))

const expandClass = computed(() => ({
  "dropdown__button--expanded": !isOptionsHiding.value,
  "dropdown__button--collapsed": !isOptionsHiding.value,
}))

useClickOutside(dropdownRef, () => {
  if (isOptionsHiding.value) return
  isOptionsHiding.value = true
})

const toggleShowOptions = () => {
  isOptionsHiding.value = !isOptionsHiding.value
}

const selectHandler = (item) => {
  selected.value = item
  isOptionsHiding.value = true
  emits("update:modelValue", selected.value)
}

onMounted(() => {
  if (!selected.value) return
  emits("update:modelValue", selected.value)
  emits("isValid", !!errorMessage.value)
})
</script>

<template>
  <div ref="dropdownRef" class="dropdown">
    <button @click="toggleShowOptions" :class="errorClass" class="dropdown__selected">
      <span>{{selected}}</span>
      <span v-if="props.showError && errorMessage" class="dropdown__error-message">{{errorMessage}}</span>
      <ButtonComp :class="expandClass" class="dropdown__button" btnPadding="p-0" icon="expand_more"></ButtonComp>
    </button>
    <div v-show="!isOptionsHiding"  class="dropdown__options">
      <span class="dropdown__option" @click="selectHandler(item)" v-for="item in props.items" :key="item" :value="item">{{props.valueKey(item)}}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  .dropdown{
    @apply flex flex-col text-sm gap-2 relative;

    &__selected{
      @apply w-full flex items-center justify-between border-2 border-secondary-dark focus-within:border-primary rounded cursor-pointer px-4 py-1;

      &--error{
        @apply border-red-400 focus-within:border-red-400;
      }
    }

    &__options{
      @apply bg-brand-dark absolute w-full top-12 flex flex-col gap-2 p-4 rounded font-normal text-sm select-none
    }

    &__option{
      @apply text-secondary hover:text-white transition-colors cursor-pointer;
    }

    &__error-message{
      @apply ml-auto px-2 text-red-400 mb-1
    }

    &__button{
      @apply select-none transition-transform;
      
      &--expanded{
        @apply -rotate-180;
      }

      &--collapsed{
        @apply rotate-180;
      }
    } 
  }
</style>