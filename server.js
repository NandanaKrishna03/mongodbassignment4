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
    const { task, isCompleted } = req.body;

    // Validate the incoming data
    if (!task || typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: "Invalid input data" });
    }

    // Create a new task
    const newTask = new Task({ task, isCompleted });

    newTask.save()
        .then(() => {
            res.status(201).json({ message: "Task created successfully", task: newTask });
        })
        .catch(err => {
            console.error("Error saving task:", err);
            res.status(500).json({ error: "Failed to save task" });
        });
});
app.put('/:id', (req, res) => {
    const { id } = req.params; // Extract task ID from the URL
    const { task, isCompleted } = req.body; // Extract updated data from the request body

    // Validate the incoming data
    if (!task || typeof isCompleted !== 'boolean') {
        return res.status(400).json({ error: "Invalid input data" });
    }

    // Find and update the task by ID
    Task.findByIdAndUpdate(
        id,
        { task, isCompleted },
        { new: true, runValidators: true } // Return the updated document and validate data
    )
        .then((updatedTask) => {
            if (!updatedTask) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json({ message: "Task updated successfully", task: updatedTask });
        })
        .catch((err) => {
            console.error("Error updating task:", err);
            res.status(500).json({ error: "Failed to update task" });
        });
});

app.delete('/:id', (req, res) => {
    const { id } = req.params; // Extract task ID from the URL

    // Find and delete the task by ID
    Task.findByIdAndDelete(id)
        .then((deletedTask) => {
            if (!deletedTask) {
                return res.status(404).json({ error: "Task not found" });
            }
            res.json({ message: "Task deleted successfully", task: deletedTask });
        })
        .catch((err) => {
            console.error("Error deleting task:", err);
            res.status(500).json({ error: "Failed to delete task" });
        });
});


app.listen(3001)