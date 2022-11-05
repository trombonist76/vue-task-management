<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import SidebarSwitch from './SidebarSwitch.vue';
import SidebarBoard from './SidebarBoard.vue';
import { useBoardStore } from "@/stores/use-board"
import { useThemeStore } from "@/stores/use-theme"
import { useMouse } from "@/composables/use-mouse"
import { ref, computed, watch } from 'vue';

const boardStore = useBoardStore()
const themeStore = useThemeStore()
const mouse = useMouse()
const isVisible = ref(true)
const visibilityClass = computed(() => ({
  "w-0 overflow-hidden": !isVisible.value
}))

watch(() => mouse.x.value, () => {
  if (mouse.x.value !== 0) return
  isVisible.value = true
})

const hidePanel = () => {
  isVisible.value = !isVisible.value
}

const isBoardActive = (board) => {
  boardStore.activeBoard === board.id
}
</script>
<template>
  <div :class="visibilityClass"
    class="w-1/3 md:w-1/6 text-white h-full pr-7 flex flex-col transition-all delay-150 border-r border-gray-700">
    <h4 class="text-xs tracking-widest text-slate-400 mb-6 mt-24 pl-6">ALL BOARDS ({{ boardStore.boards.length }})</h4>
    <div>
      <ul>
        <SidebarBoard @click="boardStore.changeActiveBoard(board)" v-for="board in boardStore.boards" :key="board.id"
          :board="board" :isActive="isBoardActive" />
      </ul>
      <div class="pl-6 py-2 flex items-center gap-2 text-slate-400">
        <ButtonComp class="text-primary" icon="list_alt" iconClass="text-secondary" iconFontSize="text-2xl" name="+ Create New Board"></ButtonComp>
      </div>
    </div>
    <div class="pl-4 mt-auto mb-7">
      <SidebarSwitch :isThemeLight="themeStore.isLight" :toggleTheme="themeStore.toggleTheme" />
      <ButtonComp @click="hidePanel" class="text-secondary text-xs tracking-wide font-bold px-1" btnGap="gap-3" icon="visibility_off" iconClass="text-secondary" iconFontSize="text-base" name="Hide Sidebar"></ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  
</style>