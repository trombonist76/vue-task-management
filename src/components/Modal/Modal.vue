<script setup>
import { useClickOutside } from "@/composables/use-clickOutside"
import { ref, defineAsyncComponent, useSlots } from 'vue';


const emits = defineEmits(["clickedOutside"])
const props = defineProps(["isOpen", "modalComponent"])
const slots = useSlots()
const slotRef = ref(null) //template ref
const contentRef = ref(null) //template ref

const ModalComponent = defineAsyncComponent(() =>
  import(`./TaskModal.vue`)
)

useClickOutside(slotRef, () => {
  if(!slots.default) return
  emits("clickedOutside")
})

useClickOutside(contentRef, () => {
  if(!props.isOpen) return
  emits("clickedOutside")
})

</script>
<template>
  <Transition name="fade">
    <div class="modal" v-show="props.isOpen">
        <slot v-if="!props.modalComponent" ref="slotRef"></slot>
        <div v-else ref="contentRef">
          <ModalComponent ></ModalComponent>
        </div>
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