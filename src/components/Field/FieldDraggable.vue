<script setup>
import { ref } from "vue";
import draggable from "vuedraggable"
import Task from '../Main/Task.vue';

const props = defineProps(["tasks"])
const tasksProp = ref(props.tasks)
const drag = ref(false)
const dragOptions = ref({
    animation: 200,
    group: "description",
    disabled: false,
    ghostClass: "ghost"
})

const handler = (birsey) => {
  console.log('birsey', birsey)
}
</script>

<template>
  <draggable
    :component-data="{
      tag: 'ul',
      class: 'tasks',
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
      <Task class="tasks__task" :task="element"></Task>
    </template>
  </draggable>
</template>

<style lang="scss" scoped>
.tasks{
    @apply flex flex-col gap-4 cursor-move flex-1;

    &__task {
      @apply cursor-pointer border border-border border-opacity-50
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