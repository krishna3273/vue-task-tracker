const express=require('express')
const cors=require('cors')
const path=require('path')
const { default: axios } = require('axios')

const  app=express()

app.use(cors())
app.use(express.json());


app.get('/tasks/:id',async(req,res)=>{
    data=await axios.get(`http://localhost:3000/tasks/${req.params.id}`)
    data=await data.data
    res.send(data)
})

app.get('/tasks',async (req,res)=>{
    data=await axios.get(`http://localhost:3000/tasks`)
    data=await data.data
    res.send(data)
})

app.post('/tasks',async(req,res)=>{
    data=req.body
    data=await axios.post('http://localhost:3000/tasks',data)
    // console.log(data)
    data=await data.data
    res.send(data)
})

app.delete('/tasks/:id',async(req,res)=>{
    await axios.delete(`http://localhost:3000/tasks/${req.params.id}`)
    res.sendStatus(200)
})

app.put('/tasks/:id',async(req,res)=>{
    data=req.body
    data=await axios.put(`http://localhost:3000/tasks/${req.params.id}`,data)
    data=await data.data
    // console.log(data);
    return res.send(data)
})
app.use(express.static('public'))

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,'public','index.html'))
})

const PORT= process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})