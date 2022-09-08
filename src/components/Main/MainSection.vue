<script>
import HeaderPanel from '../Header/HeaderPanel.vue';
import Field from './Field.vue';
import CreateTask from './CreateTask.vue';
export default {
  components: { HeaderPanel, Field, CreateTask },
  inject:["activeTab"],
  computed:{
    fields(){
      const colors = ['bg-blue-300','bg-primary','bg-green-300','bg-orange-300', 'bg-blue-500', 'bg-rose-500'].reverse()
      const taskList = []
      const fields = this.activeTab.value.tasks.reduce((uniqueTasks,task)=>{
        if(!taskList.includes(task.status)){
          taskList.push(task.status)
          uniqueTasks.push({name:task.status,color:colors.pop()})
        }
        return uniqueTasks
      },[])
      return fields
    }
  }
}
</script>
<template>
  <div class="flex-1 flex flex-col text-white">
    <HeaderPanel/>
    <main class="flex-1 bg-brand-dark px-7 py-4 flex gap-6">
      <Field v-for="(field,index) in fields" :key="index" :field=field />
    </main>
  </div>
  <CreateTask/>
</template>