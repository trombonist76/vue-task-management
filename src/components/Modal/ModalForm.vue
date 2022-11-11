<script setup>
import { defineAsyncComponent, computed } from 'vue';
const props = defineProps(["title", "description", "type", "formComponent"])
const path = computed(() => `../Form/${props.formComponent}Form.vue`)
const FormComponent = defineAsyncComponent(() => import( /* @vite-ignore */ path.value))
const titleClass = computed(() => ({
  "form__title--delete": props.type === "delete"
}))
</script>
<template>
  <div class="form">
    <div class="form__header">
      <h4 :class="titleClass" class="form__title">{{props.title}}</h4>
    </div>
    <div v-if="props.description" class="form__description">
      <p class="form__description">{{props.description}}</p>
    </div>
    <FormComponent/>
  </div>
</template>

<style lang="scss" scoped>
  .form{
    @apply bg-brand m-auto p-8 flex flex-col gap-4 w-[30rem] text-white rounded-md;

    &__header{
      @apply flex justify-between font-bold text-lg items-center;
    }

    &__description{
      @apply text-sm leading-loose text-secondary-dark;
    }

    &__title{
      @apply font-bold;
      
      &--delete{
        @apply text-red-400
      }
    }
  }
</style>