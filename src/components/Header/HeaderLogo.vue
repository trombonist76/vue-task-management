<script setup>
import { useMobile } from '@/composables/use-mobile';

const { isMobile } = useMobile()
const images = {
  original: "./src/assets/icons/logo.svg",
  mobile: "./src/assets/icons/logo-mobile.svg"
}
</script>

<template>
  <div class="logo">
    <img v-if="!isMobile" class="logo__image--desktop" :src="images.original" alt="brand-logo">
    <img v-else class="logo__image--mobile" :src="images.mobile" alt="brand-logo">
  </div>
</template>

<style lang="scss" scoped>
  .logo {
    @apply flex items-center pl-8 border-r border-transparent md:w-[300px] md:border-border;

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