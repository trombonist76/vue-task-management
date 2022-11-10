import { onMounted, onUnmounted } from 'vue'

export function useClickOutside(targetRef, callback) {

  function clickHandler(event) {
    if (targetRef.value?.contains(event.target)) return
    callback()
  }

  onMounted(() => window.addEventListener('click', clickHandler))
  onUnmounted(() => window.removeEventListener('click', clickHandler))

}