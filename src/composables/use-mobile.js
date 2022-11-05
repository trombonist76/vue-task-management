import { ref, onMounted, onUnmounted } from 'vue'
import { MD_BREAKPOINT } from "@/constants" 

export function useMobile() {
  const isMobile = ref(window.innerWidth <= MD_BREAKPOINT)

  function updateIsMobile() {
    isMobile.value = window.innerWidth <= MD_BREAKPOINT
  }

  onMounted(() => window.addEventListener('resize', updateIsMobile))
  onUnmounted(() => window.removeEventListener('resize', updateIsMobile))
  
  return { isMobile }
}