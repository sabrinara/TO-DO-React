// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 5000;
// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log('MongoDB connection error: ', err));

// Todo model
const Todo = mongoose.model('Todo', new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
}));

// Routes

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add a new todo
app.post('/todos', async (req, res) => {
  const { text } = req.body;
  try {
    const newTodo = new Todo({
      text,
    });
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update a todo by ID
app.put('/todos/:id', async (req, res) => {
  const { text, completed } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text, completed },
      { new: true }
    );
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a todo by ID
app.delete('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});


// Start the server
app.get('/', (req, res) => {
  res.send('The React TO_DO Server is running!')
})

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

