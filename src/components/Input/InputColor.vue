<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import { ref, onMounted, computed } from 'vue';

const emits = defineEmits("update:modelValue")
const props = defineProps(["label"])
const colors = ['#6562FC', '#2CACF7', '#40D0B7', '#F8C81D', '#F87D1C', '#F8361C']
const selectedIndex = ref(0)
const selectedColor = computed(() => colors.at(selectedIndex.value))


const checkIcon = (index) => {
  const isHaveIcon = index === selectedIndex.value ? "done": undefined
  return isHaveIcon
}

const colorHandler = (index) => {
  selectedIndex.value = index
  const color = selectedColor.value
  emits("setColor", color)
}

onMounted(() => {
  emits("setColor", selectedColor.value)
})
</script>

<template>
  <div class="color-input form__inner">
    <div v-if="props.label" class="color-input__label">{{ props.label }}</div>
    <div class="color-input__colors">
      <ButtonComp
        v-for="(color, index) in colors" 
        btnPadding="p-0"
        class="color-input__colors__circle" 
        @click="colorHandler(index)"
        :icon="checkIcon(index)"
        :class="{'selected' : index === selectedIndex}"
        :style="{ 'backgroundColor': color }">
      </ButtonComp>
    </div>

  </div>
</template>

<style lang="scss" scoped>
.color-input{
  @apply mb-2;

  &__colors {
    @apply flex gap-2 rounded-md pb-3.5;

    &__circle {
      @apply rounded-full h-6 w-6 flex justify-center items-center;
    }

    .selected{
    }
  }

  &__label {
    @apply text-xs
  }
}

</style>