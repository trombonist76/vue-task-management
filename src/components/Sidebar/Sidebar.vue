<script setup>
import ToggleInput from './ToggleInput.vue';
import Board from './Board.vue';
import { useBoardStore } from "@/stores/use-board"
import { useThemeStore } from "@/stores/use-theme"
import { useMouse } from "@/composables/use-mouse"
import { ref, computed, watch } from 'vue';

const boardStore = useBoardStore()
const themeStore = useThemeStore()
const mouse = useMouse()
const isVisible = ref(true)
const visibilityClass = computed(() => ({
  "-translate-x-full": !isVisible.value
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
    class="min-w-1/3 w-1/6 flex-shrink-0 bg-brand text-white h-full pr-7 flex flex-col transition-all delay-150 border-r border-gray-700">
    <h4 class="text-xs tracking-widest text-slate-400 mb-6 mt-24 pl-6">ALL BOARDS ({{ boardStore.boards.length }})</h4>
    <div>
      <ul>
        <Board @click="boardStore.changeActiveBoard(board)" v-for="board in boardStore.boards" :key="board.id"
          :board="board" :isActive="isBoardActive" />
      </ul>
      <div class="pl-6 py-2 flex items-center gap-2 text-slate-400">
        <span class="material-symbols-outlined w-5">list_alt</span>
        <button class="text-primary font-medium">+Create New Board</button>
      </div>
    </div>
    <div class="pl-4 mt-auto mb-7">
      <ToggleInput :isThemeLight="themeStore.isLight" :toggleTheme="themeStore.toggleTheme" />
      <button @click="hidePanel" class="text-xs text-gray-400 font-semibold tracking-wide mt-4">
        <font-awesome-icon class="mr-2" icon="fa-regular fa-eye-slash" />
        Hide Sidebar
      </button>
    </div>
  </div>
</template>