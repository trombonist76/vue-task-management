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
const { mouse } = useMouse()
const isVisible = ref(true)
const visibilityClass = computed(() => ({
  "-translate-x-full": !isVisible.value,
}))

watch(() => mouse.x, () => {
  if (mouse.x !== 0) return 
  isVisible.value = true
})

const hidePanel = () => {
  isVisible.value = !isVisible.value
}

const isBoardActive = (board) => {
  const isActive = boardStore.activeBoard.id === board.id
  return isActive
}
</script>
<template>
  <div :class="visibilityClass" class="sidebar">
      <h4 class="sidebar__title">ALL BOARDS ({{ boardStore.boards.length }})</h4>
      <div class="sidebar__content">
        <ul>
          <SidebarBoard 
            v-for="board in boardStore.boards" 
            @click="boardStore.changeActiveBoard(board)" 
            :key="board.id"
            :board="board" 
            :isActive="isBoardActive(board)" />
        </ul>
        <div class="sidebar__btn">
          <ButtonComp 
            class="sidebar__btn--add" 
            icon="list_alt" 
            iconFontSize="text-2xl" name="+ Create New Board">
          </ButtonComp>
        </div>
      </div>
      <div class="sidebar__footer">
        <SidebarSwitch :isThemeLight="themeStore.isLight" :toggleTheme="themeStore.toggleTheme" />
        <ButtonComp 
          @click="hidePanel" 
          class="sidebar__btn--hide" 
          btnGap="gap-3" 
          icon="visibility_off"
          iconClass="text-secondary"
          btnPadding="py-0"
          iconFontSize="text-lg" 
          name="Hide Sidebar">
        </ButtonComp>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply hidden md:flex md:fixed h-[calc(100%-95px)] bg-brand left-0 w-[300px] pr-7 pb-8 pt-4 flex-col border-r border-border transition-all duration-500;

  &__title {
    @apply text-xs font-bold tracking-[2.4px] text-secondary mb-4 pl-8;
  }

  &__btn {
    @apply pl-3;

    &--add {
      @apply text-primary gap-2 font-bold;
    }

    &--hide {
      @apply text-secondary text-sm mt-3 tracking-wide px-3 font-bold;
    }
  }

  &__footer {
    @apply pl-6 mt-auto;
  }
}
</style>