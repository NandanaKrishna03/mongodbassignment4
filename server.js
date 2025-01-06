const express = require('express')
const app = express()
const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config('./.env');
const dbPassword=process.env.DB_PASSWORD
console.log(dbPassword);
mongoose.connect(`mongodb+srv://nandanakrishna:${dbPassword}@main.lnqe5.mongodb.net/?retryWrites=true&w=majority&appName=main`)

.then(res=>{
    console.log("db connected successfully");
    
})
.catch(err=>{
console.log("db connection failed")

})
const TaskSchema = new mongoose.Schema({
    task: String,
    isCompleted:Boolean
  });
  const Task = mongoose.model('task', TaskSchema);
app.use(express.json())
let tasks=[
   
]
app.get('/', (req, res) => { 
  Task.find() 
  .then(taskItems=>{
    
  res.json("Response for GET request")
  })
  .catch(err=>{

  })
 
})

app.post('/', (req, res) => {
   
    const task = new Task(req.body); /
    
    task.save()
      .then(savedTask => {
        res.json("Response for POST request");
      })
      .catch(err => {
        console.error("Error saving task:", err);
        res.status(500).json({ error: "Failed to save task" });
      });
  });
  
  app.put('/:id', (req, res) => {
    const { id } = req.params; 
    const updatedData = req.body; 
    Task.findByIdAndUpdate(id, updatedData, { new: true })
      .then(updatedTask => {
        res.json("Response for PUT request");
      })
      .catch(err => {
        console.error("Error updating task:", err);
        res.status(500).json({ error: "Failed to update task" });
      });
  });
  app.delete('/:id', (req, res) => {
    const { id } = req.params; 
  
    Task.findByIdAndDelete(id)
      .then(deletedTask => {
        if (!deletedTask) {
          return res.status(404).json({ error: "Task not found" });
        }
        res.json("Response for DELETE request");
      })
      .catch(err => {
        console.error("Error deleting task:", err);
        res.status(500).json({ error: "Failed to delete task" });
      });
  });
  

app.listen(3001)
