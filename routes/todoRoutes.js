const express = require('express');
const pool = require('../connection.js')
const router = express.Router();
const { Todo } = require('../models'); // Import model "Todo"

// List All Todo
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    console.log(todos)
    res.json(todos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data todo.' });
  }
});

router.get('/test', async (req, res) => {
 res.sendStatus(200)
 console.log('test')
});
// Detail Todo
router.get('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      res.json(todo);
    } else {
      res.status(404).json({ error: 'Todo tidak ditemukan.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal mengambil data todo.' });
  }
});

// Create Todo
router.post('/', async (req, res) => {
  const { title } = req.body;
  try {
    const todo = await Todo.create({ title });
    res.status(201).json(todo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menambahkan todo.' });
  }
});

// Delete Todo (Soft Delete)
router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByPk(id);
    if (todo) {
      await todo.destroy();
      res.json({ message: 'Todo berhasil dihapus.' });
    } else {
      res.status(404).json({ error: 'Todo tidak ditemukan.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Gagal menghapus todo.' });
  }
});

module.exports = router;
