const express = require('express');
const router = express.Router();
const { Task } = require('../models/task'); // Importez le modèle Task

// GET: Récupérer toutes les tâches
router.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la récupération des tâches' });
  }
});

// POST: Créer une nouvelle tâche
router.post('/tasks', async (req, res) => {
  try {
    const { title, description } = req.body;
    const newTask = await Task.create({ title, description });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur est survenue lors de la création de la tâche' });
  }
});

// Exporte le routeur
module.exports = router;
