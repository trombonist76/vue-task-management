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
  "-translate-x-full": !isVisible.value,
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
  <div :class="visibilityClass" class="sidebar">
      <h4 class="sidebar__title">ALL BOARDS ({{ boardStore.boards.length }})</h4>
      <div>
        <ul>
          <SidebarBoard @click="boardStore.changeActiveBoard(board)" v-for="board in boardStore.boards" :key="board.id"
            :board="board" :isActive="isBoardActive" />
        </ul>
        <div class="sidebar__btn">
          <ButtonComp class="sidebar__btn--add" icon="list_alt" iconFontSize="text-2xl" name="+ Create New Board">
          </ButtonComp>
        </div>
      </div>
      <div class="sidebar__footer">
        <SidebarSwitch :isThemeLight="themeStore.isLight" :toggleTheme="themeStore.toggleTheme" />
        <ButtonComp @click="hidePanel" class="sidebar__btn--hide" btnGap="gap-3" icon="visibility_off"
          iconClass="text-secondary" iconFontSize="text-base" name="Hide Sidebar"></ButtonComp>
      </div>
    </div>
</template>

<style lang="scss" scoped>
.sidebar {
  @apply hidden md:flex md:fixed bg-brand left-0 w-[300px] pr-7 flex-col border-r border-border transition-all duration-500;

  &__title {
    @apply text-xs tracking-widest text-secondary mb-6 mt-4 pl-6;
  }

  &__btn {
    @apply pl-6 py-2;

    &--add {
      @apply text-primary gap-2 font-bold;
    }

    &--hide {
      @apply text-secondary text-xs tracking-wide px-1 font-bold;
    }
  }

  &__footer {
    @apply pl-4 mt-auto mb-7;
  }
}
</style>