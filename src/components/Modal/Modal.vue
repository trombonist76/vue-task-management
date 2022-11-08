<script setup>
import { useClickOutside } from "@/composables/use-clickOutside"
import { ref } from 'vue';

const emits = defineEmits(["clickedOutside"])
const props = defineProps(["isOpen"])
const contentRef = ref(null) //template ref
useClickOutside(contentRef, () => {
  emits("clickedOutside")
})
</script>
<template>
  <Transition name="fade">
    <div class="modal" v-show="props.isOpen">
        <slot ref="contentRef"></slot>
      </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal{
  @apply w-screen h-screen bg-black bg-opacity-50 transition-all flex items-center justify-center;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>