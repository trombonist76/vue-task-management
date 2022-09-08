<script>
import { computed } from 'vue'
import TodoList from "./components/TodoList.vue"
import LeftPanel from "./components/Sidebar/LeftPanel.vue"
import MainSection from './components/Main/MainSection.vue'

  export default {
    data(){
      return {
        title: "Platform Launch",
        todos:[],
        boards: [
          {
            id:1,
            title:"Platform Launch",
            tasks:[
              {
                id:1,
                title:"Markete Git",
                status:"Todo"
              },
              {
                id:2,
                title:"Ekmek Al",
                status:"Todo"
              },
              {
                id:3,
                title:"Domates Al",
                status:"Done"
              },           
              {
                id:4,
                title:"Biber Al",
                status:"Done"
              },
              {
                id:5,
                title:"123",
                status:"Done"
              },
              {
                id:6,
                title:"3456",
                status:"Todo"
              },
              {
                id:7,
                title:"trade some btc",
                status:"Doing"
              },
              {
                id:8,
                title:"complete last project",
                status:"Doing"
              },
              {
                id:9,
                title:"learn vue",
                status:"Doing"
              }
            ]
          },
          {
            id:2,
            title:"Marketing Plan",
            tasks:[
              {
                id:1,
                title:"Markete Git",
                status:"Doing"
              },
              {
                id:2,
                title:"Ekmek Al",
                status:"Doing"
              },
              {
                id:3,
                title:"Domates Al",
                status:"Doing"
              },           
              {
                id:4,
                title:"Biber Al",
                status:"Todo"
              },
              {
                id:4,
                title:"Karpuz Al",
                status:"Done"
              }
            ]
          }
        ],
        activeTabIndex:1,
        hideSideBar:false,
        isTaskModalOpen:false,
        newTask:{
          // title:"",
          // title:"",
          // status:null
        }
      }
    },
    
    computed:{
      activeTab(){
        return this.boards.find(board=>board.id === this.activeTabIndex)
      }
    },

    methods:{
      changeTabIndex: function(id){
        this.activeTabIndex = id
      },
      toggleSideBar: function(){
        this.hideSideBar = !this.hideSideBar
      },
      handleMove:function(event){
        const condition = event.screenX === 0 && this.hideSideBar === true
        if(condition){
          this.hideSideBar = false
        }
      },
      toggleTaskModal:function(){
        console.log(this.isTaskModalOpen)
        this.isTaskModalOpen = !this.isTaskModalOpen
      },
      removeSubtask:function(index){
      console.log(index)
      console.log(this.newTask.subtasks.at(index))
      // this.newTask.value.subtasks.splice(index,1)
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
    components: { TodoList, LeftPanel, MainSection }
}
</script>
<template>
  <div @mousemove="handleMove" class="h-full flex">
    <LeftPanel/>
    <MainSection/>
  </div>
</template>

