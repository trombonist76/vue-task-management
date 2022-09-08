<script>
export default {
  data() {
    return {
      isDark: true
    }
  },
  methods: {
    toggleTheme: function () {
      this.isDark = !this.isDark
    }
  },
  computed: {
    translateX() {
      return {
        "-translate-x-2": this.isDark,
        "translate-x-2": !this.isDark
      }
    }
  },
}
</script>
<template>
  <div>
    <div class="bg-brand-dark py-2 flex gap-2 items-center justify-center rounded-md">
      <font-awesome-icon class="w-3" icon="fa-regular fa-moon" />
      <button class="px-3 py-1 bg-primary rounded-full relative" @click="toggleTheme">
        <span :class="translateX" class="h-3 w-3 rounded-full flex bg-white transition-all delay-75"></span>
      </button>
      <font-awesome-icon class="w-3" icon="fa-regular fa-sun" />
    </div>

  </div>
</template>