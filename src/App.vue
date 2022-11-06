<script setup>
import Sidebar from "@/components/Sidebar/Sidebar.vue"
import MainSection from '@/components/Main/MainSection.vue'
import HeaderPanel from '@/components/Header/Header.vue';
import { ref } from "vue";

const isSidebarHiding = ref(false)

</script>
<template>
  <div class="app">
    <HeaderPanel v-model:isSidebarHiding="isSidebarHiding"/>
    <div class="app__content">
      <Sidebar v-model:isHiding="isSidebarHiding"/>
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

