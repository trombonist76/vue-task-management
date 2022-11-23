<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import { computed } from 'vue';

const props = defineProps(["theme", "toggleTheme"])

const animationClass = computed(() => ({
  "switch__button--slide-left": props.theme === "dark",
  "switch__button--slide-right": props.theme === "light"
}))

const toggleThemeHandler = () => {
  props.toggleTheme()
  
}

</script>
<template>
  <div class="switch">
    <ButtonComp 
      icon="dark_mode" 
      iconClass="text-secondary" 
      iconFontSize="text-xl" 
      btnPadding="px-0">
    </ButtonComp>

    <button class="switch__button" @click="toggleThemeHandler">
      <span :class="animationClass" class="switch__circle"></span>
    </button>

    <ButtonComp 
      icon="light_mode" 
      iconClass="text-secondary" 
      iconFontSize="text-xl" 
      btnPadding="px-0"></ButtonComp>
  </div>
</template>

<style lang="scss" scoped>

.switch{
  @apply bg-brand-dark py-3 flex gap-4 items-center justify-center rounded-md;

  &__button{
    @apply mx-3 px-3 py-1 bg-primary rounded-full relative;

    &--slide-left{
      @apply -translate-x-2;
    }

    &--slide-right{
      @apply translate-x-2;
    }
  }

  &__circle{
    @apply h-3 w-3 rounded-full flex bg-white transition-all delay-75;
  }
}
</style>