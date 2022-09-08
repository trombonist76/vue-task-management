<script>
export default {
  inject: ["activeTabIndex"],
  props: ["board"],
  computed:{
    isActiveTab(){
      return {
        "bg-primary":this.board.id === this.activeTabIndex.value,
        "text-slate-400":this.board.id !== this.activeTabIndex.value
      }
    }
  }
}
</script>
<template>
  <li :class="isActiveTab" class="pl-6 py-2.5 mb-2 rounded-r-full cursor-pointer select-none flex items-center gap-2">
    <font-awesome-icon class="w-5"  icon="fa-regular fa-list-alt" />
    <a>{{board.title}}</a>
  </li>
</template>