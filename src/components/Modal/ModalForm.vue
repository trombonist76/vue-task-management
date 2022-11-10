<script setup>
import TaskForm from '@/components/Form/TaskForm.vue'
import { ref, defineAsyncComponent } from 'vue';
const props = defineProps(["formTitle", "formComponent"])


const FormComponent = defineAsyncComponent(() =>
  import(`../Form/${props.formComponent}.vue`)
)
</script>
<template>
    <div class="form">
      <div class="form__header">
        <h4>{{props.formTitle}}</h4>
      </div>
      <FormComponent/>
    </div>
</template>

<style lang="scss" scoped>
  .new-task{
    @apply bg-brand m-auto p-8 flex flex-col gap-4 w-[30rem] text-white;

    &__header{
      @apply flex justify-between items-center;
    }
  }
</style>