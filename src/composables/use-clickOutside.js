import { ref, onMounted, onUnmounted } from 'vue'

export function useClickOnTarget(targetRef) {
  const isClickedOutside = ref(false)

  function clickHandler(event) {
    isClickedOutside.value = !targetRef.value.contains(event.target)
  }

  onMounted(() => window.addEventListener('click', clickHandler))
  onUnmounted(() => window.removeEventListener('click', clickHandler))

  return isClickedOutside
}