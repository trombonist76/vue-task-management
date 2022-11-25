<script setup>
import Sidebar from "@/components/Sidebar/Sidebar.vue";
import ModalForm from "./ModalForm.vue";
import { useClickOutside } from "@/composables/use-clickOutside"
import { useModalStore } from "@/stores/use-modal"
import { ref, computed } from 'vue';

const emits = defineEmits(["clickedOutside"])
const modalStore = useModalStore()
const contentRef = ref(null) //template ref
const componentName = computed(() => modalStore.name === "Sidebar" ? Sidebar : ModalForm)

useClickOutside(contentRef, () => {
  modalStore.closeModal()
  emits("clickedOutside")
})

</script>
<template>
  <div class="modal">
    <div class="modal__inner" ref="contentRef">
      <component
        :is="componentName"
        :formComponent="modalStore.name"
        :formInfo="modalStore.formInfo"
        :formData="modalStore.formData"
      ></component>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal{
  @apply absolute inset-0 bg-black bg-opacity-50 p-2 transition-all flex items-center justify-center;
  
  &__inner{
    @apply self-stretch items-center flex justify-center overflow-auto;
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