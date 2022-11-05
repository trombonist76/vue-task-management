<script >
import { computed } from 'vue'
import LeftPanel from "./components/Sidebar/LeftPanel.vue"
import MainSection from './components/Main/MainSection.vue'

  export default {
    data(){
      return {
        hideSideBar:false,
        isTaskModalOpen:false,
      }
    },


    methods:{

      toggleTaskModal:function(){
        console.log(this.isTaskModalOpen)
        this.isTaskModalOpen = !this.isTaskModalOpen
      },
      removeSubtask:function(index){
      console.log(index)
      console.log(this.newTask.subtasks.at(index))
    }
    },
    provide() {
        return {
          title:this.title,
          deleteTodo:this.deleteTodo,
          todos:this.todos,
          boards:this.boards,
          activeTabIndex:computed(() => this.activeTabIndex),
          activeTab:computed(() => this.activeTab),
          changeTabIndex:this.changeTabIndex,
          hideSideBar:computed(() => this.hideSideBar),
          toggleSideBar:this.toggleSideBar,
          isTaskModalOpen:computed(()=>this.isTaskModalOpen),
          toggleTaskModal:this.toggleTaskModal,
          newTask:computed(()=>this.newTask),
          removeSubtask:this.removeSubtask
        }
    },
    components: { LeftPanel, MainSection }
}
</script>
<template>
  <div class="h-full flex">
    <LeftPanel/>
    <MainSection/>
  </div>
</template>

