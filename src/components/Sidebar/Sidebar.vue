<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import SidebarSwitch from './SidebarSwitch.vue';
import SidebarBoard from './SidebarBoard.vue';
import { useBoardStore } from "@/stores/use-board"
import { useModalStore } from "@/stores/use-modal"
import { useThemeStore } from "@/stores/use-theme"
import { useSidebarStore } from '@/stores/use-sidebar';
import { useMouse } from "@/composables/use-mouse"
import { useMobile } from "@/composables/use-mobile"
import { computed, watch, ref } from 'vue';
import * as constants from "@/constants"

const boardStore = useBoardStore()
const themeStore = useThemeStore()
const modalStore = useModalStore()
const sidebarStore = useSidebarStore()
const { mousePosition } = useMouse()
const { isMobile } = useMobile()
const wrapper = ref(null)

const checkAddStatus = computed(() => constants.MAX_ADD_OPTION + 2 > boardStore.boards.length)
const slideClass = computed(() => ({
  "sidebar--slide-left": sidebarStore.isSidebarHiding,
}))

watch(() => mousePosition.value, () => {
  if (mousePosition.value !== 0) return
  sidebarStore.showSidebar()
})

const createBoardHandler = () => {
  modalStore.setActiveModal(constants.CREATE_BOARD)
}

</script>
<template>
    <div :class="slideClass" ref="wrapper" class="sidebar" >
      <h4 class="sidebar__title">ALL BOARDS ({{ boardStore.boards.length }})</h4>
      <div class="sidebar__content">
        <ul>
          <SidebarBoard 
            v-for="board in boardStore.boards" 
            @click="boardStore.changeActiveBoard(board)" 
            :key="board.id"
            :board="board" 
            :activeBoard="boardStore.activeBoard" />
        </ul>
        <div class="sidebar__btn">
          <ButtonComp
            v-if="checkAddStatus"
            @click="createBoardHandler"
            class="sidebar__btn--add" 
            icon="list_alt" 
            iconFontSize="text-2xl" name="+ Create New Board">
          </ButtonComp>
        </div>
      </div>
      <div class="sidebar__footer">
        <SidebarSwitch :isThemeLight="themeStore.isLight" :toggleTheme="themeStore.toggleTheme" />
        <ButtonComp 
          v-if="!isMobile"
          @click="() => sidebarStore.hideSidebar()" 
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
  @apply flex font-bold h-5/6 md:flex md:fixed md:mt-0 md:h-[calc(100%-95px)] bg-brand left-0 w-[300px] pr-7 pb-8 pt-4 flex-col border-r border-border transition-all duration-500;

  &--hidden{
    @apply hidden
  }

  &--slide-left{
    @apply -translate-x-full
  }

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