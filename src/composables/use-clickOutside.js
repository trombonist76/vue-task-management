import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(targetRef, callback) {

  function clickHandler(event) {
    const target = targetRef.value ? targetRef.value : targetRef.value
    if (target?.contains(event.target)) return
    callback()
  }

  onMounted(() => window.addEventListener('click', clickHandler))
  onUnmounted(() => window.removeEventListener('click', clickHandler))

}