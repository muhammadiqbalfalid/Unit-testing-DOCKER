const express = require('express');
const bodyParser = require('body-parser');
const models = require('./models');
const todoRoutes = require('./routes/todoRoutes'); // Import rute "todo"

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/todos', todoRoutes); // Gunakan rute "todo" di bawah /todos

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
