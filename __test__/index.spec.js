const request = require('supertest');
const express = require('express');
const { Todo } = require('../models'); // Import model "Todo"
const app = express();
app.use(express.json());

// Import your route
const todoRoute = require('../routes/todoRoutes');

app.use('/todo', todoRoute);

describe('Todo Routes', () => {
  // This variable will store the ID of the created Todo for testing
  let createdTodoId;

  beforeAll(async () => {
    await Todo.sync({ force: true }); // Re-create the database table
  });

  afterAll(async () => {
    await Todo.sync({ force: true }); // Re-create the database table
  });

  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/todo')
      .send({ title: 'Test Todo' });

    expect(response.statusCode).toBe(201);
    expect(response.body).toHaveProperty('id');
    createdTodoId = response.body.id;
  });

  it('should return a list of todos', async () => {
    const response = await request(app).get('/todo');

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should return a specific todo by ID', async () => {
    const response = await request(app).get(`/todo/${createdTodoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.id).toBe(createdTodoId);
  });

  it('should delete a todo by ID', async () => {
    const response = await request(app).delete(`/todo/${createdTodoId}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Todo berhasil dihapus.');
  });

  it('should handle a non-existent todo when trying to delete', async () => {
    const response = await request(app).delete('/todo/999'); // 999 is an invalid ID

    expect(response.statusCode).toBe(404);
    expect(response.body.error).toBe('Todo tidak ditemukan.');
  });
});
