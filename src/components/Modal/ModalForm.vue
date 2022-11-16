<script setup>
import { defineAsyncComponent, computed, ref  } from 'vue';

const props = defineProps(["formComponent", "formInfo", "formData"])

const wrapper = ref(null)
const path = computed(() => `../Form/${props.formComponent}Form.vue`)
const FormComponent = defineAsyncComponent(() => import( /* @vite-ignore */ path.value))

</script>
<template>
  <FormComponent :formInfo="props.formInfo" v-bind="props.formData"/>
</template>
