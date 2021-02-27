<template>
<div>
    <AddTask v-show="showAddTask" @add-task="addTask"/>
    <Tasks :tasks="tasks" @delete-task="deleteTask" @toggle-reminder="toggleReminder"/>
</div>
</template>

<script>
import Tasks from '../components/Tasks'
import AddTask from '../components/AddTask'
export default {
    name:'Home',
    components:{
        Tasks,
        AddTask
    },
    props:{
        showAddTask:Boolean
    },
    data(){
        return {
            tasks:[],
        }
    },
    methods:{
    async deleteTask(id){
      if(confirm('Are you sure you want to delete?')){
        const res=await fetch(`/tasks/${id}`,{
          method:'DELETE',
        })
        res.status==200?(this.tasks=this.tasks.filter((task)=> task.id!==id)):alert('Error in Deleting')
        
      }
    },
    async toggleReminder(id){
      // console.log(id);
      const taskToToggle=await this.fetchTask(id)
      const update={...taskToToggle,reminder:!taskToToggle.reminder}
      const res=await fetch(`/tasks/${id}`,{
        method:'PUT',
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(update)
      })
      const data=await res.json()
      // console.log(data)
      this.tasks=this.tasks.map((task)=>task.id===id?{...task,reminder:data.reminder}:task)
    },
    async addTask(newTask){
      const res=await fetch('/tasks',{
        method:"POST",
        headers:{
          'Content-type':'application/json'
        },
        body:JSON.stringify(newTask)
      })

      const data=await res.json()
      this.tasks=[...this.tasks,data]
    },
    async fetchTasks(){
      const res=await fetch('/tasks')
      const data=await res.json()
      console.log(data);
      return data
    },
    async fetchTask(id){
      const res=await fetch(`/tasks/${id}`)

      const data=await res.json()

      return data
    }
  },
  async created(){
    this.tasks=await this.fetchTasks()
  }
}
</script>