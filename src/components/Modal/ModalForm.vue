<script setup>
import { defineAsyncComponent } from 'vue';

const props = defineProps(["formComponent", "formInfo", "formData"])
const FormComponent = defineAsyncComponent(() => import( /* @vite-ignore */ `../../components/Form/${props.formComponent}Form.vue`))

</script>
<template>
  <FormComponent :formInfo="props.formInfo" v-bind="props.formData"/>
</template>
