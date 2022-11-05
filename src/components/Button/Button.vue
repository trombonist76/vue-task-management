<script setup>
  const props = defineProps(["name", "icon"])
</script>

<template>
  <button class="btn">
    <span v-if="props.icon" class="material-symbols-outlined btn__icon">{{props.icon}}</span>
    {{props.name}}
  </button>
</template>

<style lang="scss" scoped>
  .btn{
    @apply text-sm flex justify-center items-center rounded-full px-4 py-2 gap-1;

    &__icon{
      @apply text-base
    }
  }
</style>