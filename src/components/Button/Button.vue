<script setup>
  const props = defineProps(["name", "icon", "iconClass", "iconFontSize", "btnGap", "btnPadding"])

  const iconStyle = [
      props.iconFontSize ? props.iconFontSize : "lg:text-lg",
      props.iconClass ? props.iconClass : ""
  ]

  const btnStyle = [
    props.btnGap ? props.btnGap : "gap-1",
    props.btnPadding ? props.btnPadding : "py-1 px-4 sm:py-2"
  ]

</script>

<template>
  <button class="btn" :class="btnStyle">
    <span v-if="props.icon" :class="iconStyle" class="material-symbols-outlined btn__icon">{{props.icon}}</span>
    {{props.name}}
  </button>
</template>

<style lang="scss" scoped>
  .btn{
    @apply flex items-center rounded-full;
  }
</style>