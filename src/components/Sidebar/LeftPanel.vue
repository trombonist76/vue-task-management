<script>
import ToggleInput from './ToggleInput.vue';
import Boards from './Boards.vue';
  export default{
    inject:["boards","hideSideBar","toggleSideBar"],
    components: { ToggleInput, Boards },
    computed:{
      translateSideBar(){
        return {
          "-translate-x-full":this.hideSideBar.value,
        }
      }
    },
}
</script>
<template>
  <div :class="translateSideBar" class="w-1/4 bg-brand text-white h-full pr-7 flex flex-col transition-all delay-150 border-r border-gray-700">
    <h4 class="text-xs tracking-widest text-slate-400 mb-6 mt-24 pl-6">ALL BOARDS ({{boards.length}})</h4>
    <div>
      <Boards/>
      <div class="pl-6 py-2 flex items-center gap-2 text-slate-400">
        <font-awesome-icon class="w-5"  icon="fa-regular fa-list-alt" />
        <button class="text-primary font-medium">+Create New Board</button>
      </div>
    </div>
    <div class="pl-4 mt-auto mb-7">
        <ToggleInput/>
        <button @click="toggleSideBar" class="text-xs text-gray-400 font-semibold tracking-wide mt-4">
          <font-awesome-icon class="mr-2" icon="fa-regular fa-eye-slash" />
          Hide Sidebar</button>
    </div>
  </div>
</template>