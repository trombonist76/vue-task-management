<script setup>
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import MainSection from '@/components/Main/MainSection.vue'
import HeaderPanel from '@/components/Header/Header.vue';
</script>
<template>
  <div class="app">
    <HeaderPanel />
    <div class="app__content">
      <Sidebar />
      <MainSection />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app {
  @apply flex flex-col h-full bg-brand text-white;

  &__content {
    @apply flex-1 flex
  }
}
</style>

