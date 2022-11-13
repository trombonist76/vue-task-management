<script setup>
import { computed } from 'vue';

const props = defineProps(["title", "description", "type"])
const titleClass = computed(() => ({
  "form__title--delete": props.type === "delete"
}))
</script>

<template>
  <div class="form-header">
    <h4 :class="titleClass" class="form-title">{{props.title}}</h4>
  </div>
  <div v-if="props.description" class="form-description">
    <p>{{props.description}}</p>
  </div>
</template>

<style lang="scss" scoped>
.form-header{
  @apply flex justify-between font-bold text-lg items-center;
}

.form-description{
  @apply text-sm leading-loose text-secondary-dark;
}

.form-title{
  @apply font-bold;
      
  &--delete{
    @apply text-red-400
  }
}
</style>