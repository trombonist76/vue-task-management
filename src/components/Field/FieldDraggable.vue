<script setup>
import FieldTask from './FieldTask.vue';
import draggable from "vuedraggable"
import { ref, computed } from "vue";
import { useModalStore } from "@/stores/use-modal"
import * as modals from "@/constants"

const props = defineProps(["tasks"])
const modalStore = useModalStore()
const drag = ref(false)

const isEmpty = computed(() => ({
  "tasks--empty": props.tasks.length < 1
}))

const dragOptions = ref({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
})

const clickHandler = (title) => {
  modalStore.setActiveModal(modals.VIEW_TASK, { taskTitle: title })
}
</script>

<template>
  <draggable
    :class="isEmpty"
    :component-data="{
      tag: 'ul',
      class: [isEmpty, 'tasks'],
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }"
    group="people"
    :list="props.tasks"
    v-bind="dragOptions"
    @start="drag = true"
    @end="drag = false"
    itemKey="item"
  >
    <template #item="{ element }">
      <FieldTask @click="clickHandler(element.title)" class="tasks__task" :task="element"></FieldTask>
    </template>
  </draggable>
</template>

<style lang="scss" scoped>
.tasks{
  @apply flex flex-col gap-4 cursor-move flex-1;

  &__task {
    @apply cursor-pointer border border-border border-opacity-50
  }

  &--empty{
    @apply outline-dashed outline-2 rounded-md outline-secondary-dark/40
  }
}
.flip-list-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
.ghost {
  @apply invisible;
}
</style>