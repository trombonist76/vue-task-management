<script setup>
import { useMobile } from '@/composables/use-mobile';

const props = defineProps(["theme"])
const { isMobile } = useMobile()
</script>

<template>
  <div class="logo">
    <template v-if="isMobile">
      <img class="logo__image--mobile" src="../../assets/icons/logo-mobile.svg" alt="brand-logo">
    </template>
    <template v-else>
      <img v-show="props.theme !== 'dark'" class="logo__image--desktop" src="../../assets/icons/logo-dark.svg" alt="brand-logo">
      <img v-show="props.theme === 'dark'" class="logo__image--desktop" src="../../assets/icons/logo.svg" alt="brand-logo">
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