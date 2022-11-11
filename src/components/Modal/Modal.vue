<script setup>
import { useClickOutside } from "@/composables/use-clickOutside"
import { ref, defineAsyncComponent, computed } from 'vue';

const emits = defineEmits(["clickedOutside"])
const props = defineProps(["isOpen", "modalComponent", "title", "description", "formComponent"])
const contentRef = ref(null) //template ref
const path = computed(() => getPathByComponent())

const getPathByComponent = () => {
  const path = props.modalComponent === "Sidebar" 
  ? `../Sidebar/${props.modalComponent}.vue`
  : `./${props.modalComponent}.vue`

  return path
}

const ModalComponent = defineAsyncComponent(() =>
  import(path.value)
)

useClickOutside(contentRef, () => {
  if(!props.isOpen) return
  emits("clickedOutside")
})

</script>
<template>
  <Transition name="fade">
    <div class="modal" v-show="props.isOpen">
      <div class="modal__inner" ref="contentRef">
        <ModalComponent
          :title="props.title"
          :description="props.description"
          :formComponent="props.formComponent"
        ></ModalComponent>
      </div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.modal{
  @apply w-screen h-screen bg-black bg-opacity-50 transition-all flex items-center justify-center;
  
  &__inner{
    @apply self-stretch items-center flex justify-center;
  }
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