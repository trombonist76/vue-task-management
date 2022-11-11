<script setup>
import { defineAsyncComponent, computed } from 'vue';
const props = defineProps(["title", "formComponent"])
const path = computed(() => `../Form/${props.formComponent}Form.vue`)
const FormComponent = defineAsyncComponent(() => import( /* @vite-ignore */ path.value))
</script>
<template>
  <div class="form">
    <div class="form__header">
      <h4>{{props.title}}</h4>
    </div>
    <FormComponent/>
  </div>
</template>

<style lang="scss" scoped>
  .form{
    @apply bg-brand m-auto p-8 flex flex-col gap-4 w-[30rem] text-white;

    &__header{
      @apply flex justify-between font-bold text-lg items-center;
    }
  }
</style>