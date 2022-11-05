<script setup>
  const props = defineProps(["name", "icon", "iconClass", "iconFontSize"])
  const iconFontSize = {
    "lg:text-lg": !props.iconFontSize,
  }
  const btnClass = [
      props.iconFontSize ? props.iconFontSize : "lg:text-lg",
      props.iconClass ? props.iconClass : ""
  ]
</script>

<template>
  <button class="btn">
    <span v-if="props.icon" :class="btnClass" class="material-symbols-outlined btn__icon">{{props.icon}}</span>
    {{props.name}}
  </button>
</template>

<style lang="scss" scoped>
  .btn{
    @apply flex items-center rounded-full py-1 gap-1 px-4 sm:py-2;
  }
</style>