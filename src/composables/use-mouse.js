import { ref, onMounted, onUnmounted } from 'vue'

export function useMouse() {
  const mousePosition = ref(0)

  function updateLocation(event) {
    mousePosition.value = event.screenX
  }

  onMounted(() => window.addEventListener('mousemove', updateLocation))
  onUnmounted(() => window.removeEventListener('mousemove', updateLocation))

  return { mousePosition }
}