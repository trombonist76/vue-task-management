import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const x = ref(0)

  function updateLocation(event) {
    x.value = event.screenX
  }

  onMounted(() => window.addEventListener('mousemove', updateLocation))
  onUnmounted(() => window.removeEventListener('mousemove', updateLocation))

  return { x }
}