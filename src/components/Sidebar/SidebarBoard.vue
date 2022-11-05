<script setup>
import ButtonComp from '@/components/Button/Button.vue';
import { computed } from 'vue';

const props = defineProps(["board", "isActive"])
const classByActive = computed(() => ({
  "bg-primary": props.isActive,
  "text-slate-400 hover:text-white hover:bg-primary-light": !props.isActive
}))

</script>
<template>
  <li :class="classByActive"
    class="pl-6 py-2.5 mb-2 rounded-r-full cursor-pointer select-none flex items-center gap-2 transition-all delay-75 ease-out">
    <ButtonComp icon="list_alt" iconClass="text-secondary" iconFontSize="text-2xl"></ButtonComp>
    <a>{{ board.title }}</a>
  </li>
</template>