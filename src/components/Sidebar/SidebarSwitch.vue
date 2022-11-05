<script setup>
import { computed } from 'vue';

const props = defineProps(["isThemeLight", "toggleTheme"])

const animationClass = computed(() => ({
  "-translate-x-2": !props.isThemeLight,
  "translate-x-2": props.isThemeLight
}))

const toggleThemeHandler = () => {
  props.toggleTheme()
}

</script>
<template>
  <div>
    <div class="bg-brand-dark py-3 flex gap-4 items-center justify-center rounded-md">
      <font-awesome-icon class="w-4" icon="fa-regular fa-moon" />
      <button class="px-3 py-1 bg-primary rounded-full relative" @click="toggleThemeHandler">
        <span :class="animationClass" class="h-3 w-3 rounded-full flex bg-white transition-all delay-75"></span>
      </button>
      <font-awesome-icon class="w-4" icon="fa-regular fa-sun" />
    </div>
  </div>
</template>