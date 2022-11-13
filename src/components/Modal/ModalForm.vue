<script setup>
import { defineAsyncComponent, computed, ref  } from 'vue';
import FormHeader from '@/components/Form/FormHeader.vue';

const props = defineProps(["formComponent", "formInfo", "formData"])

const wrapper = ref(null)
const path = computed(() => `../Form/${props.formComponent}Form.vue`)
const FormComponent = defineAsyncComponent(() => import( /* @vite-ignore */ path.value))

</script>
<template>
  <div class="form" ref="wrapper">
    <FormHeader v-bind="props.formInfo"/>
    <FormComponent v-bind="props.formData"/>
  </div>
</template>

<style lang="scss" scoped>
  .form{
    @apply bg-brand m-auto p-8 flex flex-col gap-4 w-[30rem] text-white rounded-md;
  }
</style>