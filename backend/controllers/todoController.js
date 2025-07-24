const Todo = require('../models/todoModel');

// Create To-Do
exports.createTodo = async (req, res) => {
    const { task } = req.body;
    if (!task) return res.status(400).json({ message: "Task is required" });

    const todo = await Todo.create({
        userId: req.user.userId,
        task
    });

    res.status(201).json(todo);
};

// Get User's To-Dos
exports.getTodos = async (req, res) => {
    const todos = await Todo.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.status(200).json(todos);
};

// Update To-Do (mark complete/incomplete or edit task)
exports.updateTodo = async (req, res) => {
    const { id } = req.params;
    const { task, isCompleted } = req.body;

    const todo = await Todo.findOne({ _id: id, userId: req.user.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found" });

    if (task !== undefined) todo.task = task;
    if (isCompleted !== undefined) todo.isCompleted = isCompleted;

    await todo.save();
    res.status(200).json(todo);
};

// Delete To-Do
exports.deleteTodo = async (req, res) => {
    const { id } = req.params;

    const todo = await Todo.findOneAndDelete({ _id: id, userId: req.user.userId });
    if (!todo) return res.status(404).json({ message: "Todo not found or already deleted" });

    res.status(200).json({ message: "Todo deleted successfully" });
};
