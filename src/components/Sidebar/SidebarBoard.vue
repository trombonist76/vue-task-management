<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import { computed } from 'vue';

const props = defineProps(["board", "activeBoard"])
const isActive = computed(() => props.activeBoard.id === props.board.id)
const classByActive = computed(() => ({
  "bg-primary text-white": isActive.value,
  "text-slate-400 hover:text-white hover:bg-primary-light": !isActive.value
}))

</script>
<template>
  <li :class="classByActive"
    class="pl-7 py-1.5 pr-1.5 mb-1 rounded-r-full cursor-pointer select-none flex items-center gap-3 transition-colors duration-150 ease-out">
    <ButtonComp icon="list_alt" btnPadding="pr-0" iconFontSize="text-2xl"></ButtonComp>
    <a>{{ board.title }}</a>
  </li>
</template>