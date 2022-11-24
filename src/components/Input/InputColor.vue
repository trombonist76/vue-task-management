<script setup>
import { ref, onMounted, computed } from 'vue';

const emits = defineEmits("update:modelValue")
const props = defineProps(["label", "modelValue"])

const colorHandler = (event) => {
  emits("update:modelValue", event.target.value)
}
</script>

<template>
  <div class="color-input form__inner">
    <div v-if="props.label" class="color-input__label">{{ props.label}}</div>
      <input @change="colorHandler" type="color" class="color-input__color-picker" :style="{backgroundColor: props.modelValue}" :value="props.modelValue">
  </div>
</template>

<style lang="scss" scoped>
.color-input{
  @apply pl-2;

  &__color-picker{
    @apply appearance-none border-none bg-black rounded-xl w-6 h-6;

    &::-webkit-color-swatch {
      @apply p-1 border-none rounded-xl;
    }

    &::-webkit-color-swatch-wrapper {
      @apply p-0 rounded-xl;    
    }
  }
  &__label {
    @apply text-xs
  }
}
</style>