const express = require('express');

const cors = require('cors');
const connectDB = require('./db/db');
const taskRoutes = require('./routes/route');
const { configDotenv } = require('dotenv');
const app = express();



configDotenv();
connectDB();
app.use(express.json());
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(taskRoutes); // Routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} 🚀`));