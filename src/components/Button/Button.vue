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
    @apply flex items-center rounded-full py-1 gap-1 px-4 sm:py-2;

    &__icon{
      @apply text-base lg:text-lg
    }
  }
</style>