<template>
    <div :key="task.id" v-for="task in tasks">
        <Task v-bind:task="task" @delete-task="$emit('delete-task',task.id)" @toggle-reminder="$emit('toggle-reminder',task.id)"></Task>
    </div>
</template>

<script>
import Task from './Task'
export default{
    name:"Tasks",
    props:{
        tasks:Array
    },
    components:{
        Task
    },
    emits:["delete-task",'toggle-reminder']
}

</script>