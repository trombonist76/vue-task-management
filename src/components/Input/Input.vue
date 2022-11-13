<script setup>
import ButtonComp from "@/components/Button/Button.vue"
import { computed, ref } from "vue";
const props = defineProps({
  label: String, modelValue: String, required: Boolean, disabled: Boolean,
  deleteButton: Boolean, showError: Boolean, itemList: Array, placeholder: String,
  inputType: { type: String, default: "input" },
  errorMessages: {type: Object, default: { used: "Used", required: "Required" }},
  itemKey: { type: Function, default(item) { return item }}
})
const emits = defineEmits(["update:modelValue", "update:isValid", "delete"])
const userInput = ref(props.modelValue || "")

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

const boxClass = computed(() => ({
  "input__box--error": props.showError && errorMessage.value,
  "input__box--disabled": props.disabled,
}))

const inputHandler = (event) => {
  if(props.disabled) return
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
      <label :class="boxClass" class="input__box">
        <component 
          class="input__input" 
          rows="4" :class="inputClass" 
          type="text"
          :is="props.inputType"
          :disabled="props.disabled"
          :placeholder="props.placeholder" 
          :value="userInput" 
          @input="inputHandler">
        </component>
        <span v-if="props.showError" class="input__message input__message--error">{{errorMessage}}</span>
      </label>
      <ButtonComp 
        @click="deleteHandler"
        v-show="props.deleteButton" 
        class="input__delete-btn"
        icon="close"
        iconClass="text-xl font-bold text-secondary"
        btnPadding="p-0">
      </ButtonComp>
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
    @apply flex-1 flex items-center pr-2 bg-brand rounded text-sm border border-secondary-dark focus-within:border-primary transition-all duration-200;

    &--error {
      @apply border-red-400 focus-within:border-red-400;
    }

    &--disabled {
      @apply opacity-30;
    }
  }

  &__input {
    @apply flex-1 px-4 py-2 bg-transparent outline-none resize-none placeholder:leading-relaxed placeholder:text-xs placeholder:text-secondary placeholder:text-opacity-60;
  }

  &__message {
    @apply text-xs font-bold;

    &--error {
      @apply text-red-400;
    }
  }
}
</style>