<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import { computed, ref } from "vue";
const props = defineProps({
  label: String, value: String, required: Boolean, 
  deleteButton: Boolean, itemKey: Function, 
  showError: Boolean, itemList: Array,
  inputType: { type: String, default: "input"},
  errorMessages: {type: Object, default: { used: "Used", required: "Required"}}
})
const emits = defineEmits(["update:modelValue", "update:isValid", "delete"])
const userInput = ref(props.value || "")

const errors = computed(() => ({
  used: props.itemList && props.itemList.some(item => props.itemKey(item) === userInput.value),
  required: userInput.value === ""
}))

const errorMessage = computed(() => {
  const errorName =  Object.keys(errors.value).find((errorName) => errors.value[errorName])
  const message = props.errorMessages[errorName]
  return message
})

const inputClass = {
  "input__input--textarea": props.inputType === "textarea"
}

const errorClass = computed(() => ({
  "input__box--error": props.showError && errorMessage.value
}))

const inputHandler = (event) => {
  const inputText = event.target.value.trim()
  userInput.value = inputText
  
  emits("update:modelValue", userInput.value)
  emits("update:isValid", !errorMessage.value)
}

const deleteHandler = () => {
  emits("delete")
}
</script>

<template>
  <div class="input">
    <div class="input__label">{{ props.label }}</div>
    <div class="input__body">
      <label :class="errorClass" class="input__box">
        <component :is="props.inputType" rows="4" :class="inputClass" class="input__input" :value="userInput" @input="inputHandler" type="text"/>
        <span v-if="props.showError" class="input__message input__message--error">{{errorMessage}}</span>
      </label>
      <ButtonComp v-show="props.deleteButton" @click="deleteHandler" icon="close" iconClass="text-secondary text-xl font-bold" btnPadding="p-0"></ButtonComp>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.input {
  @apply flex flex-col gap-2;

  &__label {
    @apply text-xs;
  }

  &__body {
    @apply flex gap-3;
  }

  &__box {
    @apply flex-1 flex items-center pr-2 bg-brand rounded text-sm border-2 border-secondary-dark focus-within:border-primary transition-all duration-200;

    &--error {
      @apply border-red-400 focus-within:border-red-400;
    }
  }

  &__input {
    @apply flex-1 px-4 py-2 bg-transparent outline-none resize-none;
  }

  &__message {
    @apply text-xs font-bold;

    &--error {
      @apply text-red-400;
    }
  }
}
</style>