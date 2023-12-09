const express = require('express');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const cors = require('cors');


// Connect to database
connectDB();

const app = express();
app.use(express.json())
app.use(cors())

app.get('/', (req, res) => {
  res.status(200).json({ message: "Welcome to the Used Stuff Platform" })
})

// Routes
app.use('/users', require('./routes/userRoutes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

