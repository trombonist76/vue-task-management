<script setup>
import FieldBlank from '@/components/Field/FieldBlank.vue';
import Field from '@/components/Field/Field.vue';
import { useBoardStore } from "@/stores/use-board"
import { useSidebarStore } from "@/stores/use-sidebar"
import { useMobile } from "@/composables/use-mobile"
import { computed } from 'vue';
import { MAX_ADD_OPTION } from '@/constants';

const boardStore = useBoardStore()
const sidebarStore = useSidebarStore()
const { isMobile } = useMobile()

const checkAddStatus = computed(() => MAX_ADD_OPTION > boardStore.boards.length)
const widthClass = computed(() => ({
  "fields-wrapper--full": sidebarStore.isSidebarHiding || isMobile.value,
}))

</script>
<template>
  <main class="fields-wrapper" :class="widthClass">
    <ul class="fields-wrapper__fields">
      <Field
        v-for="(field, name) in boardStore.activeBoard?.fields"
        :key="field.id"
        :field="field"
        :name="name"
        :activeBoard="boardStore.activeBoard">
      </Field>
      <FieldBlank v-if="checkAddStatus"></FieldBlank>
    </ul>
  </main>
</template>

<style lang="scss" scoped>
  .fields-wrapper{
    @apply absolute -z-0 inset-0 left-[300px] flex-1 flex flex-col transition-all duration-500 bg-brand-dark;
    
    &--full{
      @apply left-0
    }

    &__fields{
      @apply flex-1 p-6 flex gap-6 max-h-full w-[100%] overflow-auto 
    }
  }  
</style>