<script setup>
import { computed } from 'vue';

const props = defineProps(["title", "description", "type"])
const titleClass = computed(() => ({
  "form-title--delete": props.type === "delete"
}))
</script>

<template>
  <div class="form-header">
    <h4 :class="titleClass" class="form-title">{{props.title}}</h4>
    <div v-if="props.description" class="form-description">
      <p>{{props.description}}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.form-header{
  @apply flex flex-col gap-4;
}

.form-description{
  @apply text-sm leading-loose text-secondary-dark;
}

.form-title{
  @apply font-bold text-lg;
      
  &--delete{
    @apply text-red-400
  }
}
</style>