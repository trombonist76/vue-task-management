<script setup>
import { useMobile } from '@/composables/use-mobile';

const props = defineProps(["theme"])
const { isMobile } = useMobile()
const images = {
  original: "./src/assets/icons/logo.svg",
  dark: "./src/assets/icons/logo-dark.svg",
  mobile: "./src/assets/icons/logo-mobile.svg"
}
</script>

<template>
  <div class="logo">
    <template v-if="isMobile">
      <img class="logo__image--mobile" :src="images.mobile" alt="brand-logo">
    </template>
    <template v-else>
      <img v-if="props.theme !== 'dark'" class="logo__image--desktop" :src="images.dark" alt="brand-logo">
      <img v-else class="logo__image--desktop" :src="images.original" alt="brand-logo">
    </template>
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    @apply flex items-center pl-8 border-r border-transparent md:w-[300px] md:border-light-hover dark:md:border-border;

    &__image {
      @apply flex;

      &--mobile {
        @apply md:hidden
      }

      &--desktop {
        @apply hidden md:block
      }
    }
  }
</style>