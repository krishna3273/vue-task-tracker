<template>
    <header>
        <!-- <h1>Task Tracker</h1> -->
        <h1>{{title}}</h1>
        <Button v-show="homePage" :text="showAddTask?'Close':'Add Task'" :color="showAddTask?'red':'green'" @btn-click="$emit('toggle-add-task')" ></Button>
    </header>
</template>

<script>
import Button from './Button'
export default{
    name:"Header",
    // props:['title']
    props:{
        title:String,
        showAddTask:Boolean
    },
    components:{
        Button
    },
    computed:{
        homePage(){
            // console.log(this.$route.path);
            if(this.$route.path==='/'){
                return true
            }
            return false
        }
    }
}
</script>
<style scoped>
header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
</style>