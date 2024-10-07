const Joi = require('joi');
const Task = require('../models/task');

const taskSchema = Joi.object({
  title: Joi.string().min(3).required(),
  description: Joi.string().optional(),
  status: Joi.string().valid('pending', 'completed').optional(),
});

exports.createTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create task' });
  }
};

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { error } = taskSchema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.update(req.body);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update task' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    if (!task) return res.status(404).json({ error: 'Task not found' });

    await task.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
