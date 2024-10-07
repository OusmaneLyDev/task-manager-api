const express = require('express');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/taskRoutes');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use('/api', taskRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync({ force: true }).then(() => {
  console.log('Database synchronized');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
