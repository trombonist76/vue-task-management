<script setup>
import FieldDraggable from "./FieldDraggable.vue";
const props = defineProps(["field"])

</script>
<template>
  <div class="field drop-zone">
    <div class="field__header">
      <span :class="props.field.color" class="field__circle"></span>
      {{ props.field.status.toUpperCase() }} ({{ props.field.tasks.length }})
    </div>
    <FieldDraggable :tasks="props.field.tasks"></FieldDraggable>
  </div>
</template>

<style lang="scss" scoped>
.field {
  @apply h-full flex flex-col w-[17.5rem] font-bold select-none;

  &__header {
    @apply tracking-[2.4px] text-secondary text-xs mb-7;
  }

  &__circle {
    @apply w-3 h-3 rounded-full inline-flex mr-2;
  }
}
</style>