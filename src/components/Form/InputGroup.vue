<script setup>
const props = defineProps({
  label: String
})
</script>

<template>
  <div class="input-group">
    <div class="input-group__label">{{ props.label }}</div>
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
  .input-group{
    @apply flex flex-col;

    &__label {
    @apply text-xs;
  }
  }
</style>